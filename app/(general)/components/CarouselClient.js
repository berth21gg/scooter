'use client'
import React, { Component } from "react"
import Carousel from 'react-bootstrap/Carousel';

export default function CarouselClient(){
    return(
        <Carousel>
            {/* Primer Slide */}
                <Carousel.Item>
                    <img 
                        className="d-block w-100"
                        src="./img/patinete01_1080.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>E-Scooter</h3>
                        <p>Desplazate de una forma diferente</p>
                    </Carousel.Caption>
                </Carousel.Item>
             {/* Segundo Slide */}
                <Carousel.Item>
                    <img 
                        className="d-block w-100"
                        src="./img/patinete02_1080.jpg"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Scooter segunda mano</h3>
                        <p>Conectamos directamente al vendedor y comprador</p>
                    </Carousel.Caption>
                </Carousel.Item>
        </Carousel>
    )
}