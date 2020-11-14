import http from 'k6/http'
import { Counter, Rate } from 'k6/metrics'

export const options = {
  scenarios: {
    example_senario: {
      executor: 'ramping-arrival-rate',
      startRate: '50',
      timeUnit: '1s',
      preAllocatedVUs: 50,
      maxVUs: 100,
      stages: [
        { target: 200, duration: '30s' },
        { target: 0, duration: '30s' },
      ],
    },
  },
}

export default function () {
  http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"FetchPosts","variables":{},"query":"query FetchPosts {\n  posts {\n    ...Post\n    __typename\n  }\n}\n\nfragment User on User {\n  id\n  name\n  email\n  userType\n  __typename\n}\n\nfragment Post on Post {\n  id\n  musicLink\n  commentary\n  user {\n    ...User\n    __typename\n  }\n  __typename\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
