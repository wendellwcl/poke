//Instructions for use

//1.This function must be assigned to the onLoad and onError events of the "<img>" tag

//2.This function must receive the target element that invokes it as a parameter (e.currentTarget)

//3.The "<img>" element that will receive this function must have "display: none" as default

//4.A "<div>" element with the "loading_placeholder" class must be inserted before the "<img>" element
// .loading_placeholder {
//   width: 100%;
//   height: 100%;
//   position: relative;
// }
// .loading_placeholder:before {
//   content: "";
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   width: 50px;
//   height: 50px;
//   translate: -50% -50%;
//   background: url(___INSERT YOUR LOADING ICON___) no-repeat center;
//   background-size: contain;
//   animation: loading_animation 2s linear infinite;
// }
// @keyframes loading_animation {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }

//5.The "<img>" and "<div class='loading_placeholder'>" elements must be inside a parent element that will serve exclusively as a container

//6.The container / parent element must have CSS rules that establish the desired width and height for the "<img>" element

//7.The container / parent element must have CSS rules to center its content

function imgLoadingPlaceholder(imgEl: HTMLImageElement) {
    const parentEl = imgEl.parentNode;

    try {
        const placeholderEl = parentEl!.querySelector<HTMLDivElement>(
            ".loading_placeholder"
        );

        if (!placeholderEl) {
            throw new Error(
                'To use the "imgLoadingPlaceholder" function, you must insert a "<div>" with the class "loading_placeholder" before the "<img>" element that will invoke the function'
            );
        }

        placeholderEl.remove();
        imgEl.style.display = "flex";
    } catch (err) {
        console.error(err);
    }
}

export default imgLoadingPlaceholder;
