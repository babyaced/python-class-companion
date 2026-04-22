---
theme: default
title: Python — Organizing Your Code
transition: slide-left
fonts:
  sans: 'Inter'
  serif: 'Inter'
---

# Python
## Organizing Your Code

---

# Agenda

- Warm up
- The problem with one big file
- Modules
- Importing
- The main function
- Activity

<style>
li { font-size: 1.4rem; line-height: 2; }
</style>

---

# The problem with one big file

```python
class Circle:
    # ...

class Rectangle:
    # ...

img = Image.new("RGB", (800, 800), (255, 255, 255))
draw = ImageDraw.Draw(img)
# draw circles, rectangles...
img.save("output.png")
```

This works, but the file keeps growing. Finding a specific class gets harder the more code you add.

<style>
.slidev-code code { font-size: 1rem; line-height: 1.6; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# Modules

A **module** is a `.py` file that holds related code.

You already use modules. When you write `import random`, you're pulling in Python's built-in random module.

You can make your own modules the same way.

<style>
p { font-size: 1.4rem; line-height: 2; }
</style>

---

# Splitting into files

Instead of one big file, give each class its own file.

```
project/
├── circle.py
├── rectangle.py
└── main.py
```

Each file is a module. `circle.py` holds the `Circle` class. `rectangle.py` holds the `Rectangle` class. `main.py` is where you run everything.

<style>
.slidev-code code { font-size: 1.1rem; line-height: 1.8; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# Importing your own modules

Once your code is split up, you need to tell Python where to find each class.

```python
from circle import Circle
from rectangle import Rectangle
```

This is the same pattern you've used with Pillow. The filename (without `.py`) goes on the left. The class name goes on the right.

<style>
.slidev-code code { font-size: 1.1rem; line-height: 1.7; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# main.py

`main.py` is your **entry point**. It's where the program actually runs.

```python
from circle import Circle
from rectangle import Rectangle

# set up your image
# create and draw your shapes
# save the image
```

It imports the classes it needs and uses them. The shape classes don't need to know anything about `main.py`.

<style>
.slidev-code code { font-size: 1rem; line-height: 1.8; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# The main function

Right now `main.py` runs code at the top level. That's fine, but it's common to wrap it in a function called `main`.

```python
from circle import Circle

def main():
    # your setup and drawing code goes here
    pass

main()
```

This keeps your runnable code organized in one place.

<style>
.slidev-code code { font-size: 0.85rem; line-height: 1.6; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# if \_\_name\_\_ == "\_\_main\_\_"

There's one more thing worth adding at the bottom of `main.py`.

```python
if __name__ == "__main__":
    main()
```

When you run a file directly, Python sets `__name__` to `"__main__"`. When another file imports it, `__name__` is set to the filename instead. This guard makes sure `main()` only runs when you actually execute the file.

<Callout>You'll see this pattern in almost every Python project. It's a good habit to use it.</Callout>

<style>
.slidev-code code { font-size: 1.05rem; line-height: 1.7; }
p { font-size: 1.05rem; line-height: 1.8; }
</style>

---

# Why this helps

Each file has one job.

- `circle.py` knows how to be a circle.
- `rectangle.py` knows how to be a rectangle.
- `main.py` knows how to set up the image and draw everything.

When something breaks, you know exactly which file to look in.

<style>
p { font-size: 1.4rem; line-height: 2; }
li { font-size: 1.3rem; line-height: 2; }
</style>

---

# One thing to watch out for

Your files need to be in the **same folder** for local imports to work.

```
project/
├── circle.py     ✓ same folder
├── rectangle.py  ✓ same folder
└── main.py       ✓ same folder
```

If `circle.py` is in a different folder than `main.py`, the import will fail.

<style>
.slidev-code code { font-size: 1.1rem; line-height: 1.8; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# Activity

Split your project into multiple files.

- Create `circle.py` and move your `Circle` class into it
- Create `rectangle.py` and move your `Rectangle` class into it
- In `main.py`, import both classes and run your image generation

Run the code and confirm you still get the same image output.

<style>
p { font-size: 1.3rem; line-height: 2; }
li { font-size: 1.1rem; line-height: 2; }
</style>

---

# Project Time — Phase 5

- Refactor your project so each shape class lives in its own module/file.

- Use `def main()` and `if __name__ == "__main__": main()` in your entry point.

- Move your code into reusable functions where it makes sense

- If you finish early and you haven't created a Rectangle class yet, add a Rectangle class

- Turn your code into Google Classroom

<style>
p { font-size: 1.4rem; line-height: 2; }
</style>

---
layout: center
---

# Thank you!
