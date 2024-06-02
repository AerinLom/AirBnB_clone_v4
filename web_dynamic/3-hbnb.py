#!/usr/bin/python3
"""
Script to start a Flask web application that integrates HTML files and displays
information from a storage backend.
"""

from flask import Flask, render_template
from models import storage
import uuid

app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'

@app.teardown_appcontext
def teardown_database(exception):
    """
    After each request, this method closes the current SQLAlchemy session.
    """
    storage.close()

@app.route('/3-hbnb, strict_slashes=False')
def hbnb_filters():
    """
    Handles request to custom template with states, cities, amenities, places, and users.
    """
    state_objs = storage.all('State').values()
    states = {state.name: state for state in state_objs}
    amenities = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = {user.id: f"{user.first_name} {user.last_name}" for user in storage.all('User').values()}
    
    return render_template('3-hbnb.html',
                           cache_id=uuid.uuid4(),
                           states=states,
                           amenities=amenities,
                           places=places,
                           users=users)

if __name__ == "__main__":
    app.run(host=host, port=port)
