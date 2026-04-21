---
theme: default
title: Python — Object Composition and Polymorphism
transition: slide-left
fonts:
  sans: 'Inter'
  serif: 'Inter'
---

# Python
## Object Composition and Polymorphism

---

# Agenda

- Warm up
- Review: Classes
- Object Composition
- Has-a relationship
- Activity
- Polymorphism

<style>
li { font-size: 1.4rem; line-height: 2; }
</style>

---

# Warm Up

Write down 3 things that describe a pet and 3 things a pet does.

<style>
p { font-size: 1.4rem; line-height: 2; }
</style>

---

# Object Composition

When one object holds other objects as attributes, that's called **composition**.

It lets you build more complex things out of simpler, focused pieces.

<style>
p { font-size: 1.5rem; line-height: 2; }
</style>

---

# Without Composition

```python
img = Image.new("RGB", (800, 800), (255, 255, 255))
draw = ImageDraw.Draw(img)

x = random.randint(0, 800)
y = random.randint(0, 800)
size = random.randint(10, 100)
color = (255, 0, 0)
draw.circle((x, y), radius=size, fill=color)

img.save("output.png")
```

Canvas info and shape info are just loose values floating at the top level.

<style>
.slidev-code code { font-size: 1rem; line-height: 1.6; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# Has-a

Composition describes a **has-a** relationship.

A canvas **has** shapes.

`Canvas` will own the image setup, store a list of shapes, and know how to render them all.

<style>
p { font-size: 1.5rem; line-height: 2; }
</style>

---

# Building on our Canvas

Say we want to add `Rectangle` shapes to the canvas as well.

**Do you think we can do that?**

<style>
p { font-size: 1.5rem; line-height: 2; }
</style>

---

# Building on our Canvas

We've created a new class: `Rectangle`.

```python
class Rectangle:
    def __init__(self, x, y, width, height, color):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.color = color
```

**Do you think we can add it to the canvas?**

<style>
.slidev-code code { font-size: 1.1rem; line-height: 1.6; }
p { font-size: 1.2rem; line-height: 1.8; }
</style>

---

# Building on our Canvas

Yes. The shapes list can hold any object, so adding it is no problem.

But if we want to render it...

<style>
p { font-size: 1.6rem; line-height: 2; }
</style>

---

# Polymorphism

Every shape needs a `draw()` method.

`Canvas` doesn't know what type of shape it has. It just tries to call `draw()`. If the method isn't there, it crashes.

```python
class Circle:
    def draw(self, draw_context):
        draw_context.circle((self.x, self.y), radius=self.radius, fill=self.color)

class Rectangle:
    def draw(self, draw_context):
        draw_context.rectangle([self.x, self.y, self.x + self.width, self.y + self.height], fill=self.color)
```

<style>
.slidev-code code { font-size: 1rem; line-height: 1.6; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# Polymorphism

```python
canvas = Canvas(800, 800, (255, 255, 255))
canvas.add_shape(Circle(100, 200, 50, (255, 0, 0)))
canvas.add_shape(Rectangle(300, 400, 80, 60, (0, 0, 255)))
canvas.add_shape(Circle(600, 300, 40, (0, 200, 100)))
canvas.render("output.png")
```

`Canvas` doesn't care what type of shape it has. It just calls `draw()` and each shape handles the rest.

<style>
.slidev-code code { font-size: 1.1rem; line-height: 1.6; }
p { font-size: 1.2rem; line-height: 1.8; }
</style>

---

# Activity

If you haven't already, add a Rectangle class to your code.
- It should be almost exactly the same as your Circle class except it will use the Pillow method for drawing a rectangle (Hint: that means your attributes should be the parameters needed for that method)

Add a mix of `Circle` and `Rectangle` objects to your canvas.

Call `render()` and confirm both shapes appear in the image.

<style>
p { font-size: 1.4rem; line-height: 2; }
</style>

---

# Project Time — Phase 4

Build a `Canvas` class that stores shapes and renders them all.

- Define a `Canvas` class with `__init__(width, height, background_color)`, `add_shape`, and `render` methods
- `render(filename)` should take a filename, loop through the shapes list calling `draw()` on each one, then save the image to that file
- Create a `Canvas`, add a mix of `Circle` and `Rectangle` objects, and call `render()` to produce an image
- Use `random` to generate at least 50 shapes with randomized attributes

<style>
p { font-size: 1.2rem; line-height: 1.8; }
li { font-size: 1.1rem; line-height: 2; }
</style>

---
layout: center
---

# Thank you!
