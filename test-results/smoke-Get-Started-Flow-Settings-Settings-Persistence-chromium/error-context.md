# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - generic [ref=e4]:
      - img [ref=e6]
      - generic [ref=e9]:
        - heading "Welcome Back" [level=3] [ref=e10]
        - paragraph [ref=e11]: Enter your email to sign in to your accounts
    - generic [ref=e13]:
      - generic [ref=e14]:
        - text: Email
        - textbox "Email" [active] [ref=e15]:
          - /placeholder: name@example.com
      - generic [ref=e16]:
        - generic [ref=e17]:
          - generic [ref=e18]: Password
          - link "Forgot password?" [ref=e19] [cursor=pointer]:
            - /url: "#"
        - textbox "Password" [ref=e20]
      - button "Sign In" [ref=e21]
    - generic [ref=e23]:
      - text: Don't have an account?
      - link "Start for Free" [ref=e24] [cursor=pointer]:
        - /url: "#"
  - button "Open Next.js Dev Tools" [ref=e30] [cursor=pointer]:
    - img [ref=e31]
  - alert [ref=e34]
```