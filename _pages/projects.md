---
layout: page
title: Projects
permalink: /projects/
description: Research projects in generative AI, molecular design, and autonomous scientific agents.
nav: true
nav_order: 2
---

<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-2">
  {% assign sorted_projects = site.projects | sort: 'importance' %}
  {% for project in sorted_projects %}
  <div class="col">
    <div class="project-card h-100">
      {% if project.img %}
        <img src="{{ project.img | prepend: '/assets/img/' | relative_url }}"
             class="project-card-img" alt="{{ project.title }}">
      {% else %}
        <div class="project-card-icon d-flex align-items-center justify-content-center">
          <span class="fs-1">{{ project.icon | default: '🔬' }}</span>
        </div>
      {% endif %}
      <div class="project-card-body">
        <h5 class="project-card-title">
          <a href="{{ project.url | relative_url }}" class="stretched-link text-decoration-none text-body">
            {{ project.title }}
          </a>
        </h5>
        <p class="project-card-text">{{ project.description }}</p>
        {% if project.categories %}
          <div class="mt-auto pt-2">
            {% for cat in project.categories %}
              <span class="badge bg-light text-secondary border me-1">{{ cat }}</span>
            {% endfor %}
          </div>
        {% endif %}
      </div>
    </div>
  </div>
  {% endfor %}
</div>
