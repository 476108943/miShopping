var hasCall = false;

    function filtInput(e) {
        if (!hasCall) {
            var evt = e || window.event;
            var srcEl = evt.target || evt.srcElement;
            hasCall = true;
            srcEl.value = srcEl.value.replace(/[^1-9]/gi, "");
            hasCall = false;
        }
    }