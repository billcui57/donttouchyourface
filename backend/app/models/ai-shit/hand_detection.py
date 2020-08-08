from cv2 import cv2


# Load the cascade (model)
face_cascade = cv2.CascadeClassifier('./train/haarcascade_hand.xml')

# To capture video from webcam.
cap = cv2.VideoCapture(0)
# To use a video file as input
# cap = cv2.VideoCapture('filename.mp4')

while True:
    # Read the frame
    _, img = cap.read()

    #flip the frame
    img = cv2.flip(img, 1)

    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # Detect the hands
    hands = face_cascade.detectMultiScale(gray, 1.1, 4)

    handsDetections = []
    # Draw the rectangle around each face
    for (x, y, w, h) in hands:
        handsDetections.append({
            "faceX": x,
            "faceY": y,
            "faceWidth": w,
            "faceHeight": h
        })
        cv2.rectangle(img,(x,y), (x+w,y+h),1 , 2) #draw rect with the coordinates

    # Display img on canvas (screen)
    cv2.imshow('img', img)
    # Stop if escape key is pressed
    k = cv2.waitKey(30) & 0xff
    if k==27:
        break
# Release the VideoCapture object
cap.release()