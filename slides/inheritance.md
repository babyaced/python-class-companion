---
theme: default
title: Python — Inheritance
transition: slide-left
fonts:
  sans: 'Inter'
  serif: 'Inter'
---

# Python
## Inheritance

---

# Agenda

- Warm up
- What Circle and Rectangle have in common
- The is-a relationship
- Base classes
- super()
- Overriding methods
- Activity

<style>
li { font-size: 1.4rem; line-height: 2; }
</style>

---

# Warm Up

What do a circle and a rectangle have in common?

What makes them different?

<style>
p { font-size: 1.5rem; line-height: 2; }
</style>

---

# What they have in common

```python
class Circle:
    def __init__(self, x, y, radius, color):
        self.x = x
        self.y = y
        self.color = color
        self.radius = radius

class Rectangle:
    def __init__(self, x_start, y_start, x_end, y_end, color):
        self.x_start = x_start
        self.y_start = y_start
        self.color = color
        # ...
```

Both shapes have a position and a color. Both have a `draw()` method.

<style>
.slidev-code code { font-size: 0.95rem; line-height: 1.6; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# The is-a relationship

Inheritance describes an **is-a** relationship.

A `Circle` **is a** shape. A `Rectangle` **is a** shape.

When two classes share attributes and behavior, you can move the shared parts into a **base class** and have both inherit from it.

<style>
p { font-size: 1.4rem; line-height: 2; }
</style>

---

# The Shape base class

```python
class Shape:
    def __init__(self, x, y, color):
        self.x = x
        self.y = y
        self.color = color

    def draw(self, draw_context):
        pass
```

`Shape` holds everything every shape has in common. The `draw()` method is just a placeholder — each subclass will replace it with its own version.

<style>
.slidev-code code { font-size: 1.05rem; line-height: 1.7; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# Inheriting from Shape

Put the parent class in parentheses to inherit from it.

```python
class Circle(Shape):
    pass
```

`Circle` now has everything `Shape` has. Any attributes or methods defined on `Shape` are available on `Circle` automatically.

<style>
.slidev-code code { font-size: 1.2rem; line-height: 1.7; }
p { font-size: 1.2rem; line-height: 1.8; }
</style>

---

# super()

`Circle` needs `radius` in addition to the shared attributes. We write our own constructor, but call `super().__init__()` to let `Shape` handle the shared setup.

```python
class Circle(Shape):
    def __init__(self, x, y, radius, color):
        super().__init__(x, y, color)
        self.radius = radius
```

`super()` refers to the parent class. Calling `super().__init__()` runs `Shape`'s constructor so we don't have to repeat that code.

<style>
.slidev-code code { font-size: 1.05rem; line-height: 1.7; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# Overriding draw()

`Shape` has a `draw()` that does nothing. `Circle` replaces it with its own version.

```python
class Circle(Shape):
    def __init__(self, x, y, radius, color):
        super().__init__(x, y, color)
        self.radius = radius

    def draw(self, draw_context):
        draw_context.circle((self.x, self.y), radius=self.radius, fill=self.color)
```

When you define a method with the same name as one in the parent, the subclass version takes over. This is called **overriding**.

<style>
.slidev-code code { font-size: 1rem; line-height: 1.7; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# The full picture

```
Shape
├── __init__(x, y, color)   ← shared by all shapes
└── draw()                  ← placeholder, overridden by each shape

Circle(Shape)
├── __init__(x, y, radius, color)
└── draw()                  ← draws a circle

Rectangle(Shape)
├── __init__(x, y, x_end, y_end, color)
└── draw()                  ← draws a rectangle
```

<style>
.slidev-code code { font-size: 1rem; line-height: 1.8; }
</style>

---

# Activity

Update your `Circle` class to inherit from `Shape`.

- Add `(Shape)` to the class definition
- Update `__init__` to call `super().__init__()` with the shared attributes
- Make sure `draw()` still works the same way

Run your code and confirm the output looks the same.

<style>
p { font-size: 1.3rem; line-height: 2; }
li { font-size: 1.1rem; line-height: 2; }
</style>

---

# Project Time

Update both `Circle` and `Rectangle` to inherit from `Shape`.

<style>
p { font-size: 1.5rem; line-height: 2; }
</style>

---
layout: center
---

# Thank you!
