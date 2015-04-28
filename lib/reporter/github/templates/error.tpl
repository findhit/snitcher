### :x: <%- @error.name %>

##### <%- @error.message %>


<sup>
:monkey_face: An error has occured and i did my f*cking job, now its your turn, you little code monkey.
</sup>


<% if @error.stack : %>

###### Stack:
```
<%- @error.stack %>

```
<% end %>



<% if @reporter.showUpProcessENV : %>
###### process.env
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
