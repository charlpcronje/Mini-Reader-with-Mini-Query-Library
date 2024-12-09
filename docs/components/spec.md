a set of web-components that all extend a base component. Through the base component all of them log their own events:
- When the come into view
- When the go out of view
-  What percentage of itself is in view (rounded to the nearest 10%
- It own scroll height (Some elements lke the main tag can be very high and will always be in view , but it's scroll position is then what matters and what will bring other elements into view.

In al the below the width and height can be in px and % and if not specified it means px
So the hierarchy is:
- base: {
       name: BaseComponent,
       extends: litElement,
       report: {
           visibility: {
               percentage 0% to 100% rounded to nearest 10%
               debounce: changes of 10%
           },           
           scroll: {
              every time it change
              debounce: 1000ms
           }
       }, 
       attributes: {
           width: 900px,
           height: null,
           font: Arial,
           font-size: 14px,
           background-color: #444444,
           color: #FFFCCC,
           margin: auto,
           padding: 10px
          { Above was just some examples,  besically how the attributes of these components must work is if it is not a known set prop of the component, then it must be handled as an inline style of the underlying main element}
     },
     events: {
         mouseover,
         mousedown,
         mouseup,
         click,
         drag,
         load,
         unload,
         ready
         { Basically all the normal mouse events must be transparent to the underlying main element
   },
   media:  {
        extends: BaseComponent.
        name: MediaComponent,
        attributes: {
            autoplay,
            controls,
            loop
            muted
            src

       }
   }
- page : {
    tag: main,
    extends: wa-
    name: wa-page,
    
    attributes: {
        
        width: 900px,
        height: null,
        font: Arial,
        font-size: 14px
        background-color: #444444,
        color: #FFFCCC,
        margin: auto,
        padding: 10px

    }
       
}