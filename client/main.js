import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import SimpleSchema from 'simpl-schema'

import '../imports/schema'
import { Posts } from '../imports/Posts'
import Images from '../imports/Images'


import './main.html'

Template.hello.onCreated(function helloOnCreated () {
  // counter starts at 0
  this.counter = new ReactiveVar(0)
  this.ready = new ReactiveVar(false)

  const instance = this;
  this.autorun(() => {
    const sub = instance.subscribe("files.images.all");
    if (sub.ready()) {
      instance.ready.set(true)
    }
  })
})

Template.hello.helpers({
  schema () {
    return new SimpleSchema({
      title: String,
      pictures: {
        type: String,
        autoform: {
          afFieldInput: {
            multiple: true,
            type: 'fileUpload',
            collection: 'Images',
          }
        }
      },
    })
  },
  ready() {
    return Template.instance().ready.get()
  }
})

Template.hello.events({
  'submit #uploadForm' (event) {
    event.preventDefault()
  }
})
