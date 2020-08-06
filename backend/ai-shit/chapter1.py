from cv2 import cv2

img = cv2.imread("resources/img_1317.jpg")

imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
imgBlur = cv2.GaussianBlur(imgGray, (15, 15), 0)
imgCanny = cv2.Canny(imgBlur, 75, 75)
imgDialation = cv2.dilate(imgCanny, ())

cv2.imshow("Gray Image", imgGray)
cv2.imshow("Blue Image", imgBlur)
cv2.imshow("Canny Image", imgCanny)
cv2.waitKey(0)
