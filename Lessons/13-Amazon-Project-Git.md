# Lesson 13: Start the Amazon Project and Intro to Git

This is the start of our final project, the Amazon clone. In this lesson, we will:
1.  Set up the new project structure.
2.  Learn about **Git**, a powerful tool for tracking changes in our code.

---

## 1. Project Setup

We are starting a brand new, separate project.

1.  **Create a New Folder:** Create a new main folder for this entire project. A good name is **amazon-project**.
2.  **Create Project Files:** Inside the **amazon-project** folder, we will use the same professional structure we learned in Lesson 10:
    * **index.html**: This will be our main HTML file for the homepage.
    * **styles** (folder): This folder will hold all our **.css** files.
    * **scripts** (folder): This folder will hold all our **.js** files.

**`index.html` (Initial Setup):**

    <!DOCTYPE html>
    <html>
      <head>
        <title>Amazon</title>
      </head>
      <body>
        </body>
    </html>

---

## 2. Intro to Git (Version Control)

### What is Git?
**Git** is a **Version Control System**. It's a professional tool that helps developers manage and track changes to their code over time.

* **Problem:** Normally, when you save a file, you *overwrite* the old version. You can't go back. If you make a mistake, it's hard to undo.
* **Solution:** **Git** lets you save "snapshots" (called **commits**) of your entire project at any time. You can view, compare, and restore these past snapshots.



### How Git Works (The 3 Steps)

Git has a 3-step workflow for saving changes:

1.  **Modify Files:** You work on your code (e.g., you write new HTML).
2.  **Stage Files (git add):** You tell Git *which* specific files you want to include in your next "snapshot."
3.  **Commit Files (git commit):** You take the snapshot and save it permanently with a message describing what you changed.

### Why use Git?
* **It's a "super undo":** You can go back to *any* previous version of your project, even from days or weeks ago.
* **It's a requirement for jobs:** 99% of developer jobs require you to know Git.
* **It's needed for collaboration:** It's the standard tool for teams to work on the same code without overwriting each other's work (we'll see this later with **GitHub**).

---

## 3. How to Use Git (The Commands)

We use Git from the command line (the **terminal** in VS Code).

### Step 1: Initialize the Repository
You only do this **once** per project.

1.  Open your project folder (**amazon-project**) in VS Code.
2.  Open the terminal (e.g., **Terminal -> New Terminal**).
3.  Type the following command and press Enter:

        git init

    * This command initializes (creates) an empty Git **repository** (a ".git" folder) in your project. This folder will track all your changes.

### Step 2: Check the Status
This is the most common command. It tells you what's going on.

    git status

* It will show you:
    * **Untracked files:** Files that Git sees but isn't tracking yet (e.g., your **index.html**).
    * **Changes not staged for commit:** Files Git is tracking but have new, unsaved changes.

### Step 3: Stage Your Files
Before you commit, you must "stage" your files (add them to the snapshot).

    git add <filename>

* To stage *one* file (e.g., **index.html**):

        git add index.html

* **Shortcut:** To stage *all* new or modified files in the project:

        git add .

    (The **.** means "everything in this folder").

### Step 4: Commit Your Changes
This saves your snapshot to the project's history.

    git commit -m "Your descriptive message here"

* **-m** stands for "message".
* The message is **required** and should describe *what you did* (e.g., "Create index.html file", "Add 'Add to Cart' button").

**Example: Our First Commit**

1.  After running **git init**, type **git status**. You will see **index.html** is "untracked".
2.  Stage the file:

        git add index.html

3.  Check the status again: **git status**. You will see **index.html** is now green, in the "Changes to be committed" section.
4.  Commit the file:

        git commit -m "Create index.html"

5.  Check the status again: **git status**. It will say "nothing to commit, working tree clean." This means your project is fully saved.

### Step 5: View Your History

    git log

* This command shows you a list of all the **commits** you have made, with their messages and timestamps.

---

## ✏️ Lesson 13 Exercises

*(From the SuperSimpleDev video)*

* **13a.** Create a new folder for the Amazon project.
* **13b.** Inside, create an **index.html** file.
* **13c.** Open the terminal in this folder and run **git init**.
* **13d.** Run **git status** to see the untracked **index.html**.
* **13e.** Run **git add index.html** to stage the file.
* **13f.** Run **git status** again to see it's staged.
* **13g.** Run **git commit -m "Initial commit"** to save your first snapshot.
* **13h.** Run **git log** to see your commit history.
* **13i.** Make a change to **index.html** (e.g., add a **<button>**).
* **13j.** Run **git status**. It will show the file is "modified".
* **13k.** Run **git add index.html** (or **git add .**).
* **13l.** Run **git commit -m "Add button"**.
* **13m.** Run **git log** to see both of your commits.
