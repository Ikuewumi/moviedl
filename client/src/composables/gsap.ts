import gsap from 'gsap'

export const gFactory = (offState: gsap.TweenVars, onState: gsap.TweenVars) => {
   const enter = (el: HTMLElement) => gsap.fromTo(el, offState, onState)
   const leave = (el: HTMLElement, done: Function) => gsap.to(
      el, {
      ...offState,
      onComplete: done as gsap.Callback
   }
   )

   return [enter, leave]

}