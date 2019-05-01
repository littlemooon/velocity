<template>
  <Card v-if="notification" :class="classes" :backgroundColor='backgroundColor'>
    <div class="row">
      <Icon class="notification__icon">
        <AlertTriangleIcon/>
      </Icon>
      <div class="column notification__content">
        <h4>{{notification.title}}</h4>
        <code v-if='formattedText'>{{formattedText}}</code>
      </div>
      <Button :variant="buttonVariant" class='notification__close' :onClick="close">
        <Icon >
          <XIcon/>
        </Icon>
      </Button>
    </div>
  </Card>
</template>

<script lang="ts">
import { Component, namespace, Prop, Vue } from 'nuxt-property-decorator'
import { AlertTriangleIcon, XIcon } from 'vue-feather-icons'
import * as ui from '../store/ui'
import { Ui } from '../types'
import { colors } from '../utils/style.util'
import Button, { ButtonVariant } from './Button.vue'
import Card from './card/Card.vue'
import Icon from './Icon.vue'

const Ui = namespace(ui.name)

@Component({ components: { AlertTriangleIcon, XIcon, Card, Button, Icon } })
export default class Notification extends Vue {
  @Prop({ type: Object, required: true })
  public notification?: Ui.Notification

  @Ui.Action public removeNotification

  get classes() {
    const n = this.notification
    return {
      notification: true,
      [`notification--${n && n.level}`]: n,
    }
  }

  get buttonVariant() {
    return ButtonVariant.ICON
  }

  get formattedText() {
    const text = this.notification && this.notification.text

    if (typeof text === 'string') {
      return text
    } else if (text instanceof Error) {
      return text.message
    } else if (text) {
      return [text.status, text.statusText, text.message].join(': ')
    }
  }

  public close() {
    if (this.notification) {
      this.removeNotification(this.notification.id)
    }
  }

  get backgroundColor() {
    const n = this.notification
    if (n && n.level === 'error') {
      return colors.redFaded
    } else if (n && n.level === 'warn') {
      return colors.yellowFaded
    } else {
      return colors.greenFaded
    }
  }
}
</script>

<style scoped>
.notification {
  width: 100%;
  max-width: 480px;
  color: var(--c-black);
  border-radius: var(--s-2);
  text-align: left;
  margin: 0 0 var(--s-4);
  box-shadow: var(--bs-2);
}
.notification--error {
  background-color: var(--c-red-faded);
  border: 2px solid var(--c-red);
}
.notification--warn {
  background-color: var(--c-orange-faded);
  border: 2px solid var(--c-orange);
}
.notification--info {
  background-color: var(--c-green-faded);
  border: 2px solid var(--c-green);
}
.notification__content {
  width: 100%;
}
.notification__icon {
  margin: 0 var(--s-4) 0 0;
}
.notification__close {
  margin: 0 0 0 var(--s-4);
}
.notification--error svg {
  color: var(--c-red);
}
.notification--warn svg {
  color: var(--c-yellow);
}
.notification--info svg {
  color: var(--c-green);
}
h4 {
  margin: 0;
}
code {
  margin: var(--s-3) 0 0;
}
</style>
