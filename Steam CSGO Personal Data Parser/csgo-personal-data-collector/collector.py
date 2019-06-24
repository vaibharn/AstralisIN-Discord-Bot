# -*- coding: utf-8 -*-

import sys
from PyQt5 import QtWidgets,QtCore,QtGui
import webbrowser 
import pyperclip

f1 = open("csgoparse.js", "r")
f2 = open("csgoparseall.js", "r")
code1 = f1.read()
code2 = f2.read()

class Ui_Form(object):
    def setupUi(self, Form):
        Form.setObjectName("Form")
        Form.resize(640,700)
        #Code 1
        self.textBrowser = QtWidgets.QTextBrowser(Form)
        self.textBrowser.setGeometry(QtCore.QRect(10, 80, 400, 275))
        self.textBrowser.setText(code1)
        self.textBrowser.setObjectName("textBrowser")
        #Code 2
        self.textBrowser2 = QtWidgets.QTextBrowser(Form)
        self.textBrowser2.setGeometry(QtCore.QRect(10, 410, 400, 275))
        self.textBrowser2.setText(code2)
        self.textBrowser2.setObjectName("textBrowser2")
        #Main text
        self.label = QtWidgets.QLabel(Form)
        self.label.setGeometry(QtCore.QRect(10, 10, 600, 25))
        font = QtGui.QFont()
        font.setPointSize(12)
        self.label.setFont(font)
        self.label.setAccessibleName("")
        self.label.setAccessibleDescription("")
        self.label.setScaledContents(True)
        self.label.setWordWrap(False)
        self.label.setObjectName("label")
        #Text 1
        self.tlabel1 = QtWidgets.QLabel(Form)
        self.tlabel1.setGeometry(QtCore.QRect(10, 50, 500, 20))
        tfont = QtGui.QFont()
        tfont.setPointSize(10)
        self.tlabel1.setFont(tfont)
        self.tlabel1.setAccessibleName("")
        self.tlabel1.setAccessibleDescription("")
        self.tlabel1.setScaledContents(True)
        self.tlabel1.setWordWrap(False)
        self.tlabel1.setObjectName("tlabel1")
        #Text 2
        self.tlabel2 = QtWidgets.QLabel(Form)
        self.tlabel2.setGeometry(QtCore.QRect(10, 380, 500, 20))
        self.tlabel2.setFont(tfont)
        self.tlabel2.setAccessibleName("")
        self.tlabel2.setAccessibleDescription("")
        self.tlabel2.setScaledContents(True)
        self.tlabel2.setWordWrap(False)
        self.tlabel2.setObjectName("tlabel2")
        #Link button
        self.linkButton = QtWidgets.QPushButton(Form)
        self.linkButton.setGeometry(QtCore.QRect(420, 650, 200, 35))
        self.linkButton.setObjectName("linkButton")
        self.linkButton.clicked.connect(self.link_method)
        #Copy button 1
        self.copyButton1 = QtWidgets.QPushButton(Form)
        self.copyButton1.setGeometry(QtCore.QRect(420, 80, 200, 35))
        self.copyButton1.setObjectName("copyButton1")
        self.copyButton1.clicked.connect(self.copy_method1)
        #Copy button 2
        self.copyButton2 = QtWidgets.QPushButton(Form)
        self.copyButton2.setGeometry(QtCore.QRect(420, 410, 200, 35))
        self.copyButton2.setObjectName("copyButton2")
        self.copyButton2.clicked.connect(self.copy_method2)

        self.retranslateUi(Form)
        QtCore.QMetaObject.connectSlotsByName(Form)

    def retranslateUi(self, Form):
        _translate = QtCore.QCoreApplication.translate
        Form.setWindowTitle(_translate("Form", "Collect Match Data for Computation"))
        self.label.setText(_translate("Form", "Copy the script and run it on the Console(F12 in Chrome) of the following link"))
        self.tlabel1.setText(_translate("Form", "Script for specific number of pages of data"))
        self.tlabel2.setText(_translate("Form", "Script for all data"))
        self.linkButton.setText(_translate("Form", "Open CSGO Personal Game Data"))
        self.copyButton1.setText(_translate("Form","Copy to Clipboard"))
        self.copyButton2.setText(_translate("Form","Copy to Clipboard"))
    
    def link_method(self, Form):
        webbrowser.open_new_tab('https://steamcommunity.com/login/home/?goto=%2Fmy%2Fgcpd%2F730%2F%3Ftab%3Dmatchhistorycompetitive')
    
    def copy_method1(self, Form):
        pyperclip.copy(code1)
    
    def copy_method2(self, Form):
        pyperclip.copy(code2)
        
class mywindow(QtWidgets.QMainWindow):
    def __init__(self):
        super(mywindow, self).__init__()
        self.ui = Ui_Form()
        self.ui.setupUi(self)
    
app = QtWidgets.QApplication([])
 
application = mywindow()
 
application.show()
 
sys.exit(app.exec())
