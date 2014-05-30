---
layout: page
title: "Mike's PDU Tracker"
category: 
tags: []
---

Professional Development is a Big Deal. I've been having trouble keeping up with all the neat stuff I want to learn about, so I've made this little board to track what I'm learning. I'm not sure how it'll handle archiving tasks that are Done, but I'm pretty comfortable kicking that can down the road at the moment.

Key:

* <div class="pdu_key" style="background-color: lightcyan;">Light Cyan</div>: Books
* <div class="pdu_key" style="background-color: khaki;">Khaki</div>: Projects
* <div class="pdu_key" style="background-color: lavender;">Lavender</div>: Random Research or Presentation
* <div class="pdu_key" style="background-color: lightsalmon;">Light Salmon</div>: Blog Articles

Each item has a name (with an optional hyperlink to source material), a description (briefly, provided by me), and some stuff I've created based on whatever I've learned (as bulleted items).

<table class="pdu_board">
	<thead>
		<tr>
			<th> To Do </th>
			<th> Doing </th>
			<th> Done </th>
		</tr>
	</thead>
	<tbody>
		{% for item in site.data.pdu %}
		<tr>
			{% if item.status == "Doing" %}
			<td></td>
			{% elsif item.status == "Done" %}
			<td></td>
			<td></td>
			{% endif %}
			
			<td>
				<div class="pdu pdu_{{item.type}}">
					<div class="pdu_name">
						{% if item.href %}
						<a href="{{ item.href }}">
							{{ item.name }}
						</a>
						{% else %}
						<strong>{{ item.name }}</strong>
						{% endif %}
					</div>
					<div class="pdu_description">
						{{ item.description }}
					</div>
					{% if item.output %}
					<ul class="pdu_output">
						{% for link in item.output %}
						<li>
							<a href="{{ link.href }}">
								{{ link.name }}
							</a>
						</li>
						{% endfor %}
					</ul>
					{% endif %}
				</div>
			</td>
			
			{% if item.status == "To Do" %}
			<td></td>
			<td></td>
			{% elsif item.status == "Doing" %}
			<td></td>
			{% endif %}
		</tr>
		{% endfor %}
	</tbody>
</table>
