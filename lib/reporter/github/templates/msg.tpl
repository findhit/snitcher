
Hey hey little code monkey :monkey_face:,

I have a message for you that you would like to know! :grin:

```
<%- @msg %>

```

<% if @reporter.showUpProcessENV : %>
### process.env
```
<%- JSON.stringify process.env %>

```
<% end %>

<% if @reporter.options.showUpSnitcherFooter : %>
<div align="right">
    <sub>
        <sup>
            reported by <a href="https://github.com/findhit/snitcher">Snitcher</a>!
        </sup>
    </sub>
</div>
<% end %>
