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
    '{"operationName":"CreatePost","variables":{"input":{"musicLink":"link","commentary":"comment"}},"query":"mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    id\n    __typename\n  }\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
