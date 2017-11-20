title: Fix your tables: how to stop cells from expanding out of control
date: 2010-03-23 11:26
excerpt: 
categories: css, html, programming

HTML tables receive a bit of a bad rap thanks to years of abuse in web design, however in reality they're semantic as the next element. They do have their quirks though, one common problem is that instead of aligning themselves like the rigid `blocks` we're used to they tend to be a bit more fluid - expanding and contracting to fit their content.

This useful behaviour can become frustrating when a carefully laid-out table encounters abnormal input and suddenly decides to stop paying attention to the cell widths we've specified. Luckily there is a simple solution to this. All the major browsers implement an alternative `fixed` table layout which is specified through the appropriately named `table-layout` CSS property.<!--more-->

The demo table below should be 200 pixels wide, with each column taking up 50% of the total width. With the default layout enabled the last word clearly pushes the table beyond these dimensions. You can toggle the `table-layout` between `fixed` and `auto` (the default) to see the differences.

<style type="text/css">
#example-table {
border: 1px solid white;
border-collapse: collapse;
width: 200px;
overflow: auto;
}
#example-table th,
#example-table td, {
border: 1px solid white;
width: 50%;
overflow: auto;
}
</style>

### Top 5 Words

<table id="example-table">
<tbody>
<tr>
<th class="word">Word</th>
<th class="frequency">Frequency</th>
</tr>
<tr>
<td>Bite</td>
<td>5,631</td>
</tr>
<tr>
<td>My</td>
<td>6,405</td>
</tr>
<tr>
<td>Shiny</td>
<td>7,435</td>
</tr>
<tr>
<td>Metal</td>
<td>8,682</td>
</tr>
<tr>
<td>Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz</td>
<td>109,392</td>
</tr>
</tbody>
</table>
<button id="example-toggle" onclick="
	var toggle = document.getElementById('example-toggle');
	var table = document.getElementById('example-table');
	var layout = table.style.tableLayout == 'fixed' ? 'auto' : 'fixed';
	toggle.innerHTML = 'Set table-layout to ' + layout;
	table.style.tableLayout = layout;"
>Set table-layout to fixed</button>

 
On a related node, you'll notice that `overflow: hidden` has no effect on table cells. You'll have to wrap the cell contents in a container element if you want to crop it.

This simple CSS property tends to go a unnoticed, but when you need it you'll definitely be thankful it's there.