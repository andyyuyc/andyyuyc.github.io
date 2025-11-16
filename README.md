# Personal Academic Website – Yichen (Andy) Yu

This repository hosts the source code for my **personal academic website**, built with [Hugo](https://gohugo.io/) using the [PaperMod theme](https://github.com/adityatelange/hugo-PaperMod) and customized for academic and research purposes.  
The website is deployed via **GitHub Pages** and is accessible at:  
👉 [https://andyyuyc.github.io](https://andyyuyc.github.io)

---

## About Me

I am **Yichen (Andy) Yu**, a Full-Time Research Assistant at **North Carolina State University**, Master’s Student in Computer Science at **Georgia Tech**, and Founder of **AYXR**.  
My research focuses on **Human-Computer Interaction (HCI)**, with particular interest in **AR/VR interactions, accessibility, and immersive learning**.  

I have previously studied at the **University of Rochester** and published research at **CHI, UIST, Ubicomp**, and other top venues.

---

## Website Features

- 📝 **Papers** – Publications with venue, author list, and BibTeX entries.  
- 🎓 **Teaching** – Teaching Assistant and teaching experiences.  
- 📍 **Location** – Current office and contact information.  
- 📑 **CV** – Downloadable PDF version of my CV.  
- 🔗 **Links** – GitHub, Google Scholar, Twitter, and email.  
- 🎨 **Custom Styling** – Extended CSS for venues and layout refinements.

---

## Development

### Local Preview

To run the website locally:

```bash
hugo server


rm -rf public
hugo -D --ignoreCache
git add public
git commit -m "fix: correct baseURL and rebuild"
git push
