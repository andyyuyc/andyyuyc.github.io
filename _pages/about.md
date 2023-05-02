---
permalink: /
title: "Yichen(Andy) Yu


"
excerpt: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---


Education
======
* <b>University of Wisconsin–Madison</b><small>Madison, USA</small>
<br><i>Visiting International Student Program</i>                   2023.1-2023.6

* Feng Chia University                                              Taichung, Taiwan
<br><i>B.S. in Computer Science</i>                                 2020.9-2023.6
  * Majored in Information Engineering and Computer Science, GPA 3.6
  * Certificate - Collegiate Programming Examination Top 30% in Computer Science Group
  * Nondegree Program: Information and Communications Security Program/Internet of things Program

* Providence University                                             Taichung ,Taiwan
<br><i>Enrolled in B.S. in Data Science</i>                         2019.9-2020.6
  * Majored in Data Science and Big Data Analytics (GPA: 3.9)

Experience
======
* Schneider Electric                                                Shanghai, China
<br><i>Internship</i>                                               2022.7-2022.8
  * Provided technical support for the national sales department and conduct negotiations with clients
  * Customized special electric equipments and corresponding parameters to satisfy various clients needs
   
* ABB Xiamen Low Voltage Equipment Co., Ltd.                        Xiamen, China
<br><i>Internship</i>                                               2022.6-2022.7
  * Designed digital solutions for energy systems based on industrial application scenarios
  * Implemented analysis system with Python and R with machine learning for data processing

Projects
======
* Warning and Route Recommendation System for Roads with High Accident Rates
  * Based on Flutter, run on both Android and Apple platforms and is available on the App Store and Google Play
  * Utilized the data on traffic accidents in Taichung provided by the government's open data platform to classify the accidents that occurred at different periods by time and weather
  * Generated the most frequent characteristics of induced accidents from them
  
* AFC Women's Asian Cup 2022 Chinese Taipei Team Match Statistics
  * Participated in the post-match statistical analysis of Thailand vs. Indonesia (January 24, 2022), Thailand vs. Australia (January 27, 2022) and Chinese Taipei vs. the Philippines (January 30, 2022)
  * Statistics in seconds for on-court events such as possession changes, play changes, etc. that occur during the game
  * Cued the team as to which specific plays the opponent will use at which points in time and try to identify the slogans or hand signals that the opponent will use to change plays with the help of assisted technology

Site-wide configuration
------
The main configuration file for the site is in the base directory in [_config.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_config.yml), which defines the content in the sidebars and other site-wide features. You will need to replace the default variables with ones about yourself and your site's github repository. The configuration file for the top menu is in [_data/navigation.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_data/navigation.yml). For example, if you don't have a portfolio or blog posts, you can remove those items from that navigation.yml file to remove them from the header. 

Create content & metadata
------
For site content, there is one markdown file for each type of content, which are stored in directories like _publications, _talks, _posts, _teaching, or _pages. For example, each talk is a markdown file in the [_talks directory](https://github.com/academicpages/academicpages.github.io/tree/master/_talks). At the top of each markdown file is structured data in YAML about the talk, which the theme will parse to do lots of cool stuff. The same structured data about a talk is used to generate the list of talks on the [Talks page](https://academicpages.github.io/talks), each [individual page](https://academicpages.github.io/talks/2012-03-01-talk-1) for specific talks, the talks section for the [CV page](https://academicpages.github.io/cv), and the [map of places you've given a talk](https://academicpages.github.io/talkmap.html) (if you run this [python file](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.py) or [Jupyter notebook](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.ipynb), which creates the HTML for the map based on the contents of the _talks directory).

**Markdown generator**

I have also created [a set of Jupyter notebooks](https://github.com/academicpages/academicpages.github.io/tree/master/markdown_generator
) that converts a CSV containing structured data about talks or presentations into individual markdown files that will be properly formatted for the academicpages template. The sample CSVs in that directory are the ones I used to create my own personal website at stuartgeiger.com. My usual workflow is that I keep a spreadsheet of my publications and talks, then run the code in these notebooks to generate the markdown files, then commit and push them to the GitHub repository.

How to edit your site's GitHub repository
------
Many people use a git client to create files on their local computer and then push them to GitHub's servers. If you are not familiar with git, you can directly edit these configuration and markdown files directly in the github.com interface. Navigate to a file (like [this one](https://github.com/academicpages/academicpages.github.io/blob/master/_talks/2012-03-01-talk-1.md) and click the pencil icon in the top right of the content preview (to the right of the "Raw | Blame | History" buttons). You can delete a file by clicking the trashcan icon to the right of the pencil icon. You can also create new files or upload files by navigating to a directory and clicking the "Create new file" or "Upload files" buttons. 

Example: editing a markdown file for a talk
![Editing a markdown file for a talk](/images/editing-talk.png)

For more info
------
More info about configuring academicpages can be found in [the guide](https://academicpages.github.io/markdown/). The [guides for the Minimal Mistakes theme](https://mmistakes.github.io/minimal-mistakes/docs/configuration/) (which this theme was forked from) might also be helpful.
