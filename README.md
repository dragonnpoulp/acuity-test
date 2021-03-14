### Summary
This is the implementation for the Acuity's test. Please use yarn to install packages (npm should be work, but I haven't tested it yet).
### NPM Modules:
 - react libraries, typescript
 - eventemitter3: Used to implement services as event model
 - react-use: react hooks utilities (I used useThrottle to reduce the number of rendering, as I see on OKEx, they also limit this to increase performance)
 - isomorphic-ws: web socket wrapper
 - pako: indeflate the websocket's response (required by OKEX api)

### Noted:
 - It does not contain the Unit test, since I don't have too much time to invest
 - I used pure postcss to reduce the bundle size