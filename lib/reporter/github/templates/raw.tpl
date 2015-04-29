### Some RAW-shit was reported :boom:

<%- JSON.stringify @raw %>

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
