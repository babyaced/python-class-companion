---
theme: default
title: Python — Objects and Classes
transition: slide-left
fonts:
  sans: 'Inter'
  serif: 'Inter'
---

# Python
## Objects and Classes

---

# Agenda

- Warm up
- What is an object?
- Classes and constructors
- Attributes and methods
- Under the hood (Pillow)

<style>
li { font-size: 1.4rem; line-height: 2; }
</style>

---

# We've already been using objects

Since the beginning of class!

- Lists
- Dictionaries
- Even strings

Any time you use a method on one of these, you're using an object.

<style>
p, li { font-size: 1.3rem; line-height: 1.9; }
</style>

---

# What is an object?

Objects bundle **data** and **behavior** together in one place.

<div class="flex items-center gap-16 justify-center mt-10">
  <div class="text-center">
    <PhDeviceMobile :size="64" weight="thin" class="mx-auto mb-2" />
    <p class="font-bold">A Phone</p>
  </div>

  <div class="flex flex-col gap-2">
    <p class="font-bold opacity-50 text-sm uppercase tracking-wide mb-1">Data</p>
    <div class="flex items-center gap-2"><PhDatabase :size="18" weight="thin" /><span>model</span></div>
    <div class="flex items-center gap-2"><PhDatabase :size="18" weight="thin" /><span>battery_level</span></div>
    <div class="flex items-center gap-2"><PhDatabase :size="18" weight="thin" /><span>storage</span></div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="font-bold opacity-50 text-sm uppercase tracking-wide mb-1">Methods</p>
    <div class="flex items-center gap-2"><PhArrowRight :size="18" weight="thin" /><span>call()</span></div>
    <div class="flex items-center gap-2"><PhArrowRight :size="18" weight="thin" /><span>take_photo()</span></div>
    <div class="flex items-center gap-2"><PhArrowRight :size="18" weight="thin" /><span>charge()</span></div>
  </div>
</div>

<style>
p { font-size: 1.3rem; line-height: 1.8; }
</style>

---

# What is an object?

Take the `List` object:

**Data** — the list itself: `[0, 1, 2, 3, 4, 5]`

**Methods** — functions that work on the list: `.append()`, `.pop()`


The data and the behavior are bundled together.

<style>
p { font-size: 1.3rem; line-height: 2; }
</style>

---

# Creating objects using classes

A **class** is like a factory. You run it and it produces objects — each one built the same way, but with its own data.

<div class="flex gap-8 justify-center items-center text-center mt-10">
  <div>
    <PhFactory :size="36" weight="thin" />
    <p class="mt-2 text-sm opacity-60">class</p>
  </div>
  <div class="text-2xl opacity-40">→</div>
  <div class="flex gap-10">
    <div>
      <PhDeviceMobile :size="36" weight="thin" />
      <p class="mt-2 text-sm opacity-60">object</p>
    </div>
    <div>
      <PhDeviceMobile :size="36" weight="thin" />
      <p class="mt-2 text-sm opacity-60">object</p>
    </div>
    <div>
      <PhDeviceMobile :size="36" weight="thin" />
      <p class="mt-2 text-sm opacity-60">object</p>
    </div>
  </div>
</div>

<style>
p { font-size: 1.4rem; line-height: 1.8; }
</style>

---

# The Constructor

When you write a class, the first thing you write is a **constructor**.

The constructor sets up the object's starting **attributes**.

Attributes are variables that hold information about the object.

<style>
p { font-size: 1.3rem; line-height: 2; }
</style>

---

# The Constructor

When someone signs up, you need to store their info. The constructor handles that.

```python {all|2|2|3-5}
class UserAccount:
    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
```

<p v-if="$clicks >= 1"><code>self</code> is a required first parameter. It represents the current object.</p>
<p v-if="$clicks >= 2"><code>username</code>, <code>email</code>, <code>password</code> are the values you pass in when creating a new object.</p>
<p v-if="$clicks >= 3">We set the current object's attributes to the passed-in values.</p>

<style>
.slidev-code code { font-size: 1.2rem; line-height: 1.7; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# Instance Attributes

```python {3-5}
class UserAccount:
    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
```

Attributes set in the constructor are called **instance attributes**.

They are unique to each **instance** or individual object. Every account has its own `username`, `email`, and `password`.

You must prefix them with `self.` — that's what stores them on each instance.


<style>
.slidev-code code { font-size: 1.2rem; line-height: 1.7; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# Class Attributes

```python {2}
class UserAccount:
    max_login_attempts = 3

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
        self.failed_attempts = 0
```
Some values should be the same for every object. `max_login_attempts` applies to all accounts, not just one.

Class attributes are defined above the constructor and shared across every instance.



<style>
.slidev-code code { font-size: 1.1rem; line-height: 1.7; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# Class Attributes in Action

```python {2,6-8}
class UserAccount:
    max_login_attempts = 3

    # constructor...

    def failed_login(self):
        self.failed_attempts += 1
        if self.failed_attempts >= UserAccount.max_login_attempts:
            print("Account locked.")
```
Let's use our new class variable

Each failed login adds 1 to that account's `failed_attempts`.

When it reaches `max_login_attempts`, the account locks. We access the class attribute using `UserAccount.max_login_attempts` — the class name, then a dot, then the attribute.

<style>
.slidev-code code { font-size: 1rem; line-height: 1.7; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# Methods

```python
class UserAccount:
    max_login_attempts = 3

     # constructor...

    def failed_login(self):
        self.failed_attempts += 1
        if self.failed_attempts >= UserAccount.max_login_attempts:
            print("Account locked.")
```

Methods are written just like regular functions.

The difference: they have access to that specific object's data through `self`. `failed_login` knows which account's `failed_attempts` to update.

<style>
.slidev-code code { font-size: 1.1rem; line-height: 1.7; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# Creating an Object

```python
user1 = UserAccount("dsimpson", "dsimpson@missionbit.org", "password123")
```

Use the class name with `()` and pass in the arguments.

Python calls `__init__` (our constructor) when you do this.

<style>
.slidev-code code { font-size: 1.2rem; line-height: 1.7; }
p { font-size: 1.3rem; line-height: 1.9; }
</style>

---

# Using Methods

```python
user1 = UserAccount("dsimpson", "dsimpson@missionbit.org", "password123")
user1.failed_login()
user1.failed_login()
user1.failed_login()  # Account locked.
```

Use dot notation to call a method on an object. Each call updates `user1`'s own `failed_attempts`.

<style>
.slidev-code code { font-size: 1.2rem; line-height: 1.7; }
p { font-size: 1.3rem; line-height: 1.9; }
</style>

---

# Abstraction

In Python, abstraction means a method hides what's happening inside it.

You call it, pass in what it needs, and it does the work.

<v-clicks>

<div>

```python {1}
draw.circle((100, 100), radius=50, fill="red")
```

For example, when we used Pillow we used the circle method to create circles.

</div>

<div>

```python {2-3}
def circle(self, xy, radius, fill=None, outline=None, width=1):
    ellipse_xy = (xy[0] - radius, xy[1] - radius, xy[0] + radius, xy[1] + radius)
    self.ellipse(ellipse_xy, fill, outline, width)
```

Inside, it calculates the bounding box and calls `ellipse()`. You never had to think about that.

</div>

</v-clicks>

<style>
.slidev-code code { font-size: 1.09rem; line-height: 1.7; }
p { font-size: 1.2rem; line-height: 1.9; }
</style>

---

# Activity

Build a `Song` class and a `Playlist` class from scratch.

A playlist should hold multiple songs. Add at least 3 songs and print the title and artist for each one.

<style>
p { font-size: 1.4rem; line-height: 2; }
</style>

---

# Project Time — Class 3

Define a `Circle` class and a `Rectangle` class. Each one should know its own position, size, and color. Each one should know how to draw itself onto a canvas.

- Define a `Circle` class with `__init__(x, y, radius, color)` and a `draw(draw_context)` method
- Define a `Rectangle` class with `__init__(x, y, width, height, color)` and a `draw(draw_context)` method
- Create one `Circle` and one `Rectangle` manually and draw them to confirm both work

<style>
p { font-size: 1.2rem; line-height: 1.8; }
li { font-size: 1.1rem; line-height: 2; }
</style>

---
layout: center
---

# Thank you!
