import React, { Component, createRef } from 'react'
import './App.css'
import './animations.css'
import Formulaire from './components/Formulaire'
import Message from './components/Message'

//firebase
import base from './base'

//animation
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'



class App extends Component {
  state = {
    messages: {},
    pseudo: this.props.match.params.pseudo
  }

  messagesRef = createRef()



  componentDidMount(){
    base.syncState('/', {
      context: this,
      state: 'messages'
    })
  }
  componentDidUpdate(){
    const ref = this.messagesRef.current
    ref.scrollTop = ref.scrollHeight
  }

  
  addMessage = message => {
    const messages = { ...this.state.messages }
    messages[`message-${Date.now()}`] = message
    //garder les 10 dernier messages
    Object
    .keys(messages)
    .slice(0,-10)
    .forEach(keys =>{
      messages[keys] = null
    })
    this.setState({ messages })
  }
  isUser = pseudo => pseudo === this.state.pseudo

  render () {
    const messages = Object
        .keys(this.state.messages)
        .map(key => (
          <CSSTransition
            timeout={200}
            classNames='fade'
            key={key}>
            <Message
            isUser = {this.isUser}
            message ={this.state.messages[key].message}
            pseudo ={this.state.messages[key].pseudo}/>
            </CSSTransition>
        ))
    return (
      
    
      <div className='box'>
        <div>
          <div className="messages" ref={this.messagesRef}>
            <TransitionGroup className="message">
              {messages}
            </TransitionGroup>
          </div>
        </div>
        <Formulaire
        length={150}
        pseudo={this.state.pseudo}
        addMessage={this.addMessage}/>
      </div>
    )
  }
}

export default App
