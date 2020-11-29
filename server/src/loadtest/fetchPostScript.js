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

const count200 = new Counter('status_code_2xx')
const count300 = new Counter('status_code_3xx')
const count400 = new Counter('status_code_4xx')
const count500 = new Counter('status_code_5xx')

const rate200 = new Rate('rate_status_code_2xx')
const rate300 = new Rate('rate_status_code_3xx')
const rate400 = new Rate('rate_status_code_4xx')
const rate500 = new Rate('rate_status_code_5xx')

function recordRates(res) {
  if (res.status >= 200 && res.status < 300) {
    count200.add(1)
    rate200.add(1)
  } else if (res.status >= 300 && res.status < 400) {
    console.log(res.body)
    count300.add(1)
    rate300.add(1)
  } else if (res.status >= 400 && res.status < 500) {
    count400.add(1)
    rate400.add(1)
  } else if (res.status >= 500 && res.status < 600) {
    count500.add(1)
    rate500.add(1)
  }
}
