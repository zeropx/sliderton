# Slidertron

**Version 1.0.0a**


This is a slideshow to simulate iTunes' style slideshow they used. While it is no longer in use on their application. I wanted to continue to use it.

This documentation is still in development and I will continue to update as I get more time. 

## Usage

    $(document).ready(function() {
        $('#sliderton').sliderton();
    });

## Dependencies 

This plugin was built using jQuery v1.6.1 and has not been tested with prior versions (yet).

Stylesheets for this are required in order for the functionality to work as expected. A default setup is included.

## Options

    - **debug**
        Outputs some details about the project to console. Default is `false`.
        
    - **sliderton_id**
        ID of primary container for slideshow. Default is `sliderton`.
        
    - **nav_items_visible**
        Defines the number of visible navigation items. Default is `3`.
        
    - **autoscroll**
        A boolean value to allow auto play. Default is `true`.
        
    - **autoscroll_speed*
        Set speed in miliseconds. Default is `5000`.
        
    - **next_button**
        Creates a button to be used for navigating slides. Default is `true`.
        
## Full options list

*These options are temporary for version 1.0.0a and will be subject to change dramatically in the near future*

    debug: false,
    sliderton_id: "sliderton",
    slides_container_id: "slide-container",
    slides_class: "slide",
    slides_nav_id: "slide-navigation",
    slides_nav_class: "slide-nav",
    slide_next_button: "next-slide",
    wrapper: 'wrapper',
    nav_items_visible: 3,
    slide_container_width: 600,
    slide_container_height: 300,
    slide_width: 600,
    slide_height:300,
    nav_container_width: 100,
    nav_container_height: 300,
    nav_item_width: 100,
    nav_item_height: 100,
    next_button: true,
    autoscroll: true,
    autoscroll_speed: 1000

## Features

* Autoscrolling
* mouse over player stops autoscrolling
* itunes like slide play
* has a super cool canvas button

## Current Goals

* clean up code
* simplify usage
* adjust flexability
* make full HTML5 Canvas version( for fun )

