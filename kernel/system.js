const onmsg = (event) => {
    console.log(event)
}

eval("window.onmessage = onmsg")