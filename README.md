
# Portfolio Website

## Overview
This is a personal portfolio website built using **HTML, CSS, and JavaScript**. It showcases projects, skills, and experience in a clean and responsive design. The website is **hosted on AWS S3** with **static website hosting enabled** for seamless deployment and access.

## Features
- **Responsive Design** – Optimized for both desktop and mobile devices  
- **Projects Section** – Displays work and case studies  
- **Contact Form** – Allows visitors to reach out via email  
- **Animations & Effects** – Smooth transitions using CSS and JavaScript  
- **Fast & Secure Hosting** – Deployed on **AWS S3** 

## Technologies Used
- **HTML5** – Structure and content  
- **CSS3** – Styling and responsiveness  
- **JavaScript (Vanilla JS)** – Interactivity and animations  
- **AWS S3** – Static website hosting  


## Deployment on AWS S3
### Step 1: Create an S3 Bucket  
1. Go to the **AWS S3 Console**  
2. Click **Create Bucket**  
3. Enter a **unique bucket name** (e.g., `my-portfolio-site`)  
4. Uncheck **Block all public access** to allow website hosting  
5. Enable **Static website hosting** and set `index.html` as the default document  
6. Click **Create Bucket**  

### Step 2: Upload Website Files  
1. Open the **S3 bucket**  
2. Click **Upload** → Select all HTML, CSS, JS, and image files  
3. Click **Upload**  

### Step 3: Configure Bucket Permissions  
1. Go to **Permissions** → **Bucket Policy**  
2. Add a policy to allow public read access:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::my-portfolio-site/*"
       }
     ]
   }
   ```
3. Click **Save**  

### Step 4: Access Your Website  
1. Go to the **Properties** tab  
2. Find **Static website hosting**  
3. Copy the **Bucket Website Endpoint**  
4. Paste it into your browser to view the portfolio 🎉  
