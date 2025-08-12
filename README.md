# Log Analyzer (MongoDB Atlas)

## Backend setup (macOS)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
export MONGO_URI="your_mongodb_atlas_connection_string"
python seed_data.py
python app.py
```

## Frontend setup
```bash
cd frontend
npm install
npm start
```

Backend: http://localhost:5000  
Frontend: http://localhost:3000
