# handle

the iframe of a process has access to `handle`, the process object itself. it is injected after the page loads. it can:
- fork a new process
`handle.Process(/* filesystem path goes here */)`
- access the filesystem
`handle.fs.read(/* hello! */)`
- close the window
`handle.exit()`