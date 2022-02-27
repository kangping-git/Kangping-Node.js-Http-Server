<style>
    .blue{
        color: #569cd6;
    }
    .water{
        color: #9cdcfe;
    }
    .green{
        color: #4ec9b0;
    }
    .yellow{
        color: #dcdcaa;
    }
    .number{
        color: #b5cea8;
    }
    .string{
        color: #ce9178;
    }
    .const{
        color: #4fc1ff;
    }
</style>
# Kangping http Server
## create server
### node.js
<pre style="font-family: Consolas, 'Courier New', monospace;">
<span class="blue">var</span> <span class="const">app</span> = <span class="blue">new</span> <span class="water">kpserver</span>.<span class="green">app</span>();
<span class="const">app</span>.<span class="yellow">get</span>(<span class="string">"/"</span>,(<span class="water">req</span>,<span class="water">res</span>) <span class="blue">=></span> {
    <span class="water">res</span>.<span class="yellow">write</span>(<span class="string">"TEST"</span>)
    <span class="water">res</span>.<span class="yellow">end</span>()
})
<span class="const">app</span>.<span class="yellow">listen</span>(<span class="number">3000</span>)
</pre>
### return
<pre>
TEST
</pre>