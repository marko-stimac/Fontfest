import { shallow } from 'vue-test-utils'
import App from '@/App'

describe('App.vue', () => {
  let cmp

  beforeEach(() => {
    cmp = shallow(App, { // Create a shallow instance of the component
      data: {
        messages: ['Cat']
      }
    })
  })

  console.log(App)

  it('equals messages to ["Cat"]', () => {
    // Within cmp.vm, we can access all Vue instance methods
    expect(cmp.vm.messages).toEqual(['Cat'])
  })

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot()
  })
})