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

Write down 3 things that describe you and 3 things you can do.

<style>
p { font-size: 1.4rem; line-height: 2; }
</style>

---

# Review: Classes

Now let's turn that into Python.

```
class Person:
    write a constructor that takes those descriptive things  as parameters

    write the three things you can do as functions
        use pass inside the method block
```

<style>
.slidev-code code { font-size: 1.1rem; line-height: 1.7; }
p { font-size: 1.2rem; line-height: 1.9; }
</style>

---

# Activity

Use your warm up answers to create a `Person` class.

Create one object for yourself and one for the person next to you. Call a method on each one.

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
playlist_name = "My Favorites"

song1_title = "Bohemian Rhapsody"
song1_artist = "Queen"
song1_duration = 354

song2_title = "Thriller"
song2_artist = "Michael Jackson"
song2_duration = 357

song3_title = "Billie Jean"
song3_artist = "Michael Jackson"
song3_duration = 294
```

Playlist information and songs are stored completely separately.

<style>
.slidev-code code { font-size: 1rem; line-height: 1.6; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# With Composition

```python {all|1-6|10|7-13}
class Song:
    def __init__(self, title, artist, duration):
        self.title = title
        self.artist = artist
        self.duration = duration

class Playlist:
    def __init__(self, name):
        self.name = name
        self.items = []

    def add(self, song):
        self.items.append(song)
```

<v-click at="1">

A `Song` bundles title, artist, and duration into one object.

</v-click>
<v-click at="2">A <code>Playlist</code> holds a list of those objects</v-click> <v-click at="3"> but doesn't need to carry any song info itself.</v-click>



<style>
.slidev-code code { font-size: 1rem; line-height: 1.6; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# Has-a

Composition describes a **has-a** relationship.

A playlist **has** songs.

<style>
p { font-size: 1.6rem; line-height: 2; }
</style>

---

# Activity

Build a `Song` class and a `Playlist` class from scratch.

Add a `play()` method to `Song` that prints the song title and artist.

Add at least 3 songs and call `play()` on each one.

<style>
p { font-size: 1.4rem; line-height: 2; }
</style>

---

# Adding play()

```python
class Song:
    def __init__(self, title, artist, duration):
        self.title = title
        self.artist = artist
        self.duration = duration

    def play(self):
        print(f"Now playing: {self.title} by {self.artist}")

playlist = Playlist("My Favorites")
playlist.add(Song("Bohemian Rhapsody", "Queen", 354))

for song in playlist.items:
    song.play()
```

<style>
.slidev-code code { font-size: 1rem; line-height: 1.6; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# Building on our Playlist

Say we want to allow users to add Podcasts and Audiobooks to our Playlist as well.

**Do you think we can do that?**

<style>
p { font-size: 1.5rem; line-height: 2; }
</style>

---

# Building on our Playlist

We've created two new classes: `Podcast` and `Audiobook`.

```python
class Podcast:
    def __init__(self, title, host):
        self.title = title
        self.host = host

class Audiobook:
    def __init__(self, title, author):
        self.title = title
        self.author = author
```

**Do you think we can add them to the playlist?**

<style>
.slidev-code code { font-size: 1.1rem; line-height: 1.6; }
p { font-size: 1.2rem; line-height: 1.8; }
</style>

---

# Building on our Playlist

Yes. A list can hold any data type, so adding them is no problem.

But if we want to play them...

<style>
p { font-size: 1.6rem; line-height: 2; }
</style>

---

# Polymorphism

Every item needs a `play()` method.

Python doesn't know what type of object it has. It just tries to call `play()`. If the method isn't there, it crashes.

```python
class Song:
    def play(self):
        print(f"Playing song: {self.title}")

class Podcast:
    def play(self):
        print(f"Playing podcast: {self.title}")

class Audiobook:
    def play(self):
        print(f"Playing audiobook: {self.title}")
```

<style>
.slidev-code code { font-size: 1rem; line-height: 1.6; }
p { font-size: 1.1rem; line-height: 1.8; }
</style>

---

# Polymorphism

```python
playlist = Playlist("My Favorites")
playlist.add(Song("Thriller", "Michael Jackson", 357))
playlist.add(Podcast("How I Built This", "Guy Raz"))
playlist.add(Audiobook("Atomic Habits", "James Clear"))

for item in playlist.items:
    item.play()
```

`Playlist` doesn't care what type of object it has. It just calls `play()` and each object handles the rest.

<style>
.slidev-code code { font-size: 1.1rem; line-height: 1.6; }
p { font-size: 1.2rem; line-height: 1.8; }
</style>

---

# Activity

Add a `play()` method to `Podcast` and `Audiobook`.

Add a mix of all three to your playlist.

Loop through and call `play()` on each item.

<style>
p { font-size: 1.4rem; line-height: 2; }
</style>

---

# Project Time — Phase 4

Build a `Canvas` class that stores shapes and renders them all.

- Define a `Canvas` class with `__init__(width, height, background_color)`, `add_shape`, and `render` methods
- `render()` should loop through the shapes list and call `draw()` on each one
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
