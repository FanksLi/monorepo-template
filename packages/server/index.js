require('dotenv').config();
const express = require('express');
const timeout = require('connect-timeout');

const cors = require('cors');

// 从环境变量获取配置
const MODEL_NAME = process.env.MODEL_NAME;
const ARK_API_KEY = process.env.ARK_API_KEY;
const PORT = process.env.PORT || 3010;
const API_BASE_URL = process.env.API_BASE_URL;

function serialize(data) {
  return 'data: ' + JSON.stringify(data) + '\n\n';
}

const app = express();

const router = express.Router();
app.use(timeout('30s'));

app.use(cors());

app.use(express.json());

router.get('/hello', (req, res) => {
  res.json({
    data: 'hello world',
  });
  res.end();
});

const historyMessages = [];

// 辅助函数：转义SSE数据中的特殊字符
function escapeSse(text) {
  return text.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/"/g, '\\"');
}
async function handleSeeResponse(res, stream) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    const lines = chunk.split('\n').filter((line) => line.trim());
    for (const line of lines) {
      if (!line.startsWith('data:')) continue;

      const data = line.slice(5).trim();
      if (data === '[DONE]') {
        res.write(
          serialize({
            status: 'completed',
          }),
        );
        continue;
      }

      try {
        const parsed = JSON.parse(data);
        if (parsed.choices) {
          res.write(
            serialize({
              content: escapeSse(parsed.choices[0].delta.content),
            }),
          );
        }
      } catch (error) {
        console.log('解析响应失败', error);
      }
    }
  }
}
router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    // 发送初始化数据
    res.write(
      serialize({
        status: 'started',
      }),
    );

    historyMessages.push({
      role: 'user',
      content: messages,
    });

    const externalContent = 'TestComp 是一个测试组件，它有 open、isDev、onChange 三个属性';

    const response = await fetch(`${API_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ARK_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          {
            role: 'system',
            content: `
                        ## 角色
                        你是一个专业的前端编程导师，你擅长 React、Webpack、Antd 这些前端流程的框架。你能够由浅入深的回答用户关于前端的问题。
                        ## 历史对话
                        ${historyMessages}
                        ## 参考内容
                        你可以基于这些参考内容回答问题：
                        ${externalContent}
                        ## 输出规范
                         - 关于代码的问题，你能够按照“设计思路”、“代码实现“两个维度来回答。
                         - 跟编程无关的问题，你可以拒绝回答。
                    `,
          },
          { role: 'user', content: messages },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    await handleSeeResponse(res, response.body);

    res.end();
  } catch (error) {
    console.error('调用API时出错:', error.message);
    res.status(500).write(
      serialize({
        error: `抱歉，发生了错误: ${error.message}`,
      }),
    );
    res.end();
  }
});

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
