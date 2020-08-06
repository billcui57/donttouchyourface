from cv2 import cv2


# Load the cascade
face_cascade = cv2.CascadeClassifier('./train/haarcascade_frontalface_default.xml')

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
    # Detect the faces
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)
    # Draw the rectangle that is the "hand"
    handX, handY, handWidth, handHeight = 100, 100, 50, 50

    cv2.rectangle(img, (handX, handY) , (handX+handWidth, handY+handHeight), 5, 2)

    faceDetections = []
    # Draw the rectangle around each face
    for (x, y, w, h) in faces:
        faceDetections.append({
            "faceX": x,
            "faceY": y,
            "faceWidth": w,
            "faceHeight": h
        })
        cv2.rectangle(img,(x,y), (x+w,y+h),1 , 2)

    for face in faceDetections:
        if ((face['faceX'] < handX + handWidth) and
            (face['faceX'] + face['faceWidth']  > handX) and
            (face['faceY'] < handY + handHeight) and
            (face['faceY'] + face['faceHeight']  > handY)):
                print("intersecting")
        else:
            print("not intersecting")


    # Display
    cv2.imshow('img', img)
    # Stop if escape key is pressed
    k = cv2.waitKey(30) & 0xff
    if k==27:
        break
# Release the VideoCapture object
cap.release()