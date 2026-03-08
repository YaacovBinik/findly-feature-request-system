# Findly Feature Request System

מערכת Full-Stack לניהול בקשות פיצ'רים.
המערכת מאפשרת למשתמשים להציע פיצ'רים חדשים, לצפות בבקשות קיימות ולהצביע עליהן.

הפרויקט פותח במסגרת משימת בית.

---

# סקירה כללית

המערכת מאפשרת למשתמשים:

* להגיש בקשת פיצ'ר חדשה
* לצפות בכל הבקשות הקיימות
* להצביע על בקשות
* להסיר הצבעה (toggle vote)
* לזהות האם המשתמש כבר הצביע
* לזהות האם הבקשה שייכת למשתמש הנוכחי
* לערוך ולמחוק בקשות שנוצרו על ידי המשתמש

---

# טכנולוגיות (Tech Stack)

## Frontend

* React
* Vite
* TypeScript
* TailwindCSS
* shadcn/ui
* TanStack Query
* Axios

## Backend

* NestJS
* Prisma ORM
* PostgreSQL

## תשתיות

* Docker
* Docker Compose

---

# הרצת הפרויקט

## הרצה באמצעות Docker (מומלץ)

יש להריץ מהתיקייה הראשית של הפרויקט:

```bash
docker compose up --build
```

השירותים שיעלו:

Frontend
http://localhost:5173

Backend
http://localhost:3000

Database (PostgreSQL)
localhost:5433

---

## הרצה ללא Docker

### הפעלת מסד הנתונים

```bash
docker compose up postgres
```

### הרצת השרת (Backend)

```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```

השרת יעלה בכתובת:

```
http://localhost:3000
```

### הרצת ה־Frontend

```bash
cd feature-request-frontend
npm install
npm run dev
```

האפליקציה תעלה בכתובת:

```
http://localhost:5173
```

---

# תיעוד API

## קבלת כל הבקשות

```
GET /features
```

ניתן לשלוח פרמטר אופציונלי:

```
?userIdentifier=abc123
```

הפרמטר מאפשר לשרת להחזיר מידע האם המשתמש הנוכחי כבר הצביע על הבקשה.

---

## יצירת בקשת פיצ'ר

```
POST /features
```

Body לדוגמה:

```json
{
  "title": "Dark mode",
  "description": "Add dark mode support",
  "creatorIdentifier": "browser-user-123"
}
```

---

## עדכון בקשה

```
PATCH /features/:id
```

---

## מחיקת בקשה

```
DELETE /features/:id
```

---

## הצבעה / הסרת הצבעה

```
POST /features/:id/vote
```

Body לדוגמה:

```json
{
  "userIdentifier": "browser-user-123"
}
```

אם המשתמש כבר הצביע — ההצבעה תוסר.
אם לא — תתווסף הצבעה.

---

# החלטות תכנון (Design Decisions)

## זיהוי משתמשים

במקום לממש מערכת Authentication מלאה, המערכת משתמשת ב־`userIdentifier` הנשמר ב־`localStorage`.

גישה זו מאפשרת לזהות משתמשים שונים מבלי להוסיף מורכבות של מערכת התחברות, דבר שאינו נדרש למשימת הבית.

---

## מערכת ההצבעות

הצבעות נשמרות בטבלת `Vote` נפרדת במסד הנתונים.

קיים constraint ייחודי על:

```
(featureId, userIdentifier)
```

Constraint זה מונע הצבעה כפולה של אותו משתמש על אותה בקשה.

---

## Toggle Vote

אם משתמש מצביע שוב על אותה בקשה, ההצבעה מוסרת במקום להחזיר שגיאה.
גישה זו יוצרת חוויית משתמש פשוטה וברורה.

---

## ניהול מצב בצד הלקוח

ב־Frontend נעשה שימוש ב־TanStack Query לניהול בקשות לשרת, mutations וניהול cache.
כך ניתן לבצע עדכון נתונים בצורה יעילה לאחר פעולות כמו יצירת בקשה או הצבעה.

---

# שיפורים אפשריים בעתיד

* הוספת מערכת Authentication מלאה
* הוספת Pagination
* מיון בקשות לפי מספר הצבעות
* הוספת בדיקות (Tests)
* פריסה לענן (Deployment)
* הוספת מערכת התראות
* שיפור טיפול בשגיאות

---

# מבנה הפרויקט

```
findly-feature-request-system
│
├── backend
│
├── feature-request-frontend
│
├── docker-compose.yml
│
└── README.md
```
