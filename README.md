# Chat Nio Javascript Library

The official Typescript library for the Chat Nio API

- Authors: Deeptrain Team
- Free software: MIT license
- Documentation: https://docs.chatnio.net

## Features

- Chat
- Conversation
- Quota
- Subscription and Package


## Browser Compatibility
- [axios](https://github.com/axios/axios#browser-support) (for http request)
- [websocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#browser_compatibility) (for chat stream)

## Installation

```shell
npm install chatnio
# or using yarn, pnpm
# yarn add chatnio
```

## Usage

- Authentication
```javascript
import { setKey, setEndpoint } from 'chatnio';

setKey("sk-...");

// set custom api endpoint (default: https://api.chatnio.net)
// setEndpoint("https://example.com/api");
```

- Chat
```javascript
import { Chat } from 'chatnio';

const chat = new Chat(-1); // id -1 (default): create new conversation

// using stream
chat.askStream({ message: "hello world", model: "gpt-3.5-turbo-0613", web: true }, (res) => {
  console.log(res);
});

// don't use stream
chat.ask({ message: "hi" })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });


```

- Conversation
```javascript
import { getConversations, getConversation, deleteConversation } from 'chatnio';

// get all conversations of current user
const conversations = await getConversations();

// load conversation by id
const conversation = await getConversation(1);

// delete conversation by id
const state = await deleteConversation(1);
```

- Quota
```javascript
import { getQuota, buyQuota } from 'chatnio';

// get quota
const quota = await getQuota();

// buy quota
const state = await buyQuota(100);
```

- Subscription and Package
```javascript
import { getPackage, getSubscription, buySubscription } from 'chatnio';

// get package
const pkg = await getPackage();

// get subscription
const subscription = await getSubscription();

// buy subscription
const state = await buySubscription(1, 1);
```
