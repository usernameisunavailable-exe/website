1. The Daily Loop (Save & Upload)

Do this every time you finish a feature, fix a bug, or tweak your 404.html:

git add .                      # 1. Stage ALL modified/new files
git commit -m "Your message"   # 2. Create a local save point
git push origin master         # 3. Send it to GitHub

2. Status & Checking Things

When you forget what you changed or want to see what's going on:

git status                     # Shows modified files and what is staged
git log --oneline              # Shows a clean list of your past save points

3. Oops, Fixes & Getting Unstuck

When things go a bit sideways:

# Git complains about "remote contains work you do not have":
git pull origin master --rebase

# You modified a file but want to completely discard the changes since last commit:
git checkout -- filename.html

# You committed but forgot something or made a typo in the message:
git commit --amend -m "New and correct message"
