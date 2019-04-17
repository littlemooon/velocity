import * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin, components } from 'aws-amplify-vue'
import Vue from 'vue'
// import aws_exports from '@/aws-exports'

// Amplify.configure(aws_exports)
Vue.use(AmplifyPlugin, AmplifyModules)

// register components individually for further use
// Do not import in .vue files
Vue.component('amplify-authenticator', components.Authenticator)
