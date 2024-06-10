import React from 'react'
import { Container } from 'reactstrap'
import '../app-Section/AppSection.css'

const AppSection = (props) => {
  return (
    <section className='app_section'>
        <Container>
            <h2 className='text-white'>{props.title}</h2>
        </Container>
    </section>
  )
}

export default AppSection