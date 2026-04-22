---
theme: default
title: Python — Objects and Classes Review
transition: slide-left
fonts:
  sans: 'Inter'
  serif: 'Inter'
---

# Python
## Objects and Classes Review

---

# Warm Up

Write down 3 things that describe a pet and 3 things a pet does.

<style>
p { font-size: 1.4rem; line-height: 2; }
</style>

---

# Review: Classes

Now let's turn that into Python.

```
class Pet:
    constructor takes those descriptive things as parameters
        use self.attribute_name = parameter_name to store each one

    write the three things a pet does as methods
        remember: first parameter of a method is always self
        use pass as the method body
```

<style>
.slidev-code code { font-size: 1.1rem; line-height: 1.7; }
p { font-size: 1.2rem; line-height: 1.9; }
</style>

---

# Activity

1. Use your warm up answers to create a `Pet` class.
  - look at the slides from last class or the website for help
2. Create a pet object using your class.
3. Print out the pet's attributes using dot notation: `print(pet.name)`
4. Call a method on it.

<style>
li { font-size: 1.3rem; line-height: 2; }
</style>

---

# Project Time — Phase 3

Define a `Circle` class that knows its own position, size, and color, and knows how to draw itself onto a canvas.

- Define a `Circle` class with `__init__(x, y, radius, color)` and a `draw(draw_context)` method
- Create a `Circle` manually and draw it to confirm it works

<style>
p { font-size: 1.2rem; line-height: 1.8; }
li { font-size: 1.1rem; line-height: 2; }
</style>

---
layout: center
---

# Thank you!
