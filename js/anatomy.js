(function () {
    const view = document.getElementById('anatomy-view');
    if (!view) return;

    view.innerHTML = `
        <svg viewBox="0 0 480 837" xmlns="http://www.w3.org/2000/svg">
            <image href="assets/anatomy/body.webp" x="0" y="0" width="960" height="837"/>

                        <polygon class="muscle" data-muscle="shoulders" points="158,153 146,158 134,172 127,195 124,225 119,255 127,262 142,240 152,218 158,195"/>
            <polygon class="muscle" data-muscle="shoulders" points="325,153 337,158 349,172 356,195 359,225 364,255 356,262 341,240 331,218 325,195"/>

            <polygon class="muscle" data-muscle="chest" points="233,168 200,163 173,173 158,192 158,225 160,245 180,257 203,265 233,264"/>
            <polygon class="muscle" data-muscle="chest" points="250,168 283,163 310,173 325,192 325,225 323,245 303,257 280,265 250,264"/>

            <polygon class="muscle" data-muscle="biceps" points="117,257 105,281 97,297 137,303 141,288 148,268 156,235 152,217 127,262"/>
            <polygon class="muscle" data-muscle="biceps" points="366,257 378,281 386,297 346,303 342,288 335,268 327,235 331,217 356,262"/>

            <polygon class="muscle" data-muscle="abs" points="203,265 180,257 158,250 165,277 172,307 171,322 164,342 166,355 185,372 215,395 241,406 268,395 298,372 317,355 319,342 312,322 311,307 318,277 325,250 303,257 280,265"/>

            <polygon class="muscle" data-muscle="legs" points="163,400 185,392 205,410 237,418 236,470 233,520 229,556 205,560 190,555 175,522 166,480 162,440"/>
            <polygon class="muscle" data-muscle="legs" points="320,400 298,392 278,410 246,418 247,470 250,520 254,556 278,560 293,555 308,522 317,480 321,440"/>

            <polygon class="muscle" data-muscle="legs" points="185,592 222,584 233,606 234,640 230,668 218,690 190,696 181,672 177,644 180,616"/>
            <polygon class="muscle" data-muscle="legs" points="298,592 261,584 250,606 249,640 253,668 265,690 293,696 302,672 306,644 303,616"/>
        </svg>`;

    view.addEventListener('click', (event) => {
        const muscle = event.target.closest('.muscle');
        if (!muscle || !view.contains(muscle)) return;

        view.querySelectorAll('.muscle.selected')
            .forEach((el) => el.classList.remove('selected'));
        muscle.classList.add('selected');

        view.dispatchEvent(new CustomEvent('muscleSelected', {
            bubbles: true,
            detail: { muscle: muscle.dataset.muscle }
        }));
    });
})();