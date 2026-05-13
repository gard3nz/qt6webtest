/********************************************************************************
** Form generated from reading UI file 'mainwindow.ui'
**
** Created by: Qt User Interface Compiler version 6.11.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

#include <QtCore/QVariant>
#include <QtWidgets/QApplication>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QMenuBar>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QWidget *centralwidget;
    QVBoxLayout *verticalLayout;
    QWidget *widget;
    QHBoxLayout *horizontalLayout_2;
    QHBoxLayout *horizontalLayout;
    QPushButton *pushButton;
    QPushButton *pushButton_2;
    QGridLayout *gridLayout;
    QPushButton *pushButton_3;
    QPushButton *pushButton_5;
    QPushButton *pushButton_7;
    QPushButton *pushButton_11;
    QPushButton *pushButton_4;
    QPushButton *pushButton_6;
    QPushButton *pushButton_8;
    QPushButton *pushButton_10;
    QPushButton *pushButton_9;
    QPushButton *pushButton_12;
    QMenuBar *menubar;
    QStatusBar *statusbar;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName("MainWindow");
        MainWindow->resize(1168, 828);
        MainWindow->setStyleSheet(QString::fromUtf8("\n"
"QMainWindow {\n"
"    background-color: #1e1e1e;\n"
"}\n"
"\n"
"\n"
"QPushButton {\n"
"    background-color: #333333;\n"
"	color: #ffffff;\n"
"    border-radius: 5px;\n"
"    font-weight: bold;\n"
"}\n"
"\n"
"QPushButton:pressed {\n"
"    background-color: #0080FF;\n"
"}\n"
""));
        centralwidget = new QWidget(MainWindow);
        centralwidget->setObjectName("centralwidget");
        verticalLayout = new QVBoxLayout(centralwidget);
        verticalLayout->setObjectName("verticalLayout");
        widget = new QWidget(centralwidget);
        widget->setObjectName("widget");
        horizontalLayout_2 = new QHBoxLayout(widget);
        horizontalLayout_2->setObjectName("horizontalLayout_2");

        verticalLayout->addWidget(widget);

        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName("horizontalLayout");
        pushButton = new QPushButton(centralwidget);
        pushButton->setObjectName("pushButton");
        pushButton->setMinimumSize(QSize(0, 35));

        horizontalLayout->addWidget(pushButton);

        pushButton_2 = new QPushButton(centralwidget);
        pushButton_2->setObjectName("pushButton_2");
        pushButton_2->setMinimumSize(QSize(0, 35));

        horizontalLayout->addWidget(pushButton_2);


        verticalLayout->addLayout(horizontalLayout);

        gridLayout = new QGridLayout();
        gridLayout->setObjectName("gridLayout");
        pushButton_3 = new QPushButton(centralwidget);
        pushButton_3->setObjectName("pushButton_3");
        pushButton_3->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_3, 0, 0, 1, 1);

        pushButton_5 = new QPushButton(centralwidget);
        pushButton_5->setObjectName("pushButton_5");
        pushButton_5->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_5, 0, 1, 1, 1);

        pushButton_7 = new QPushButton(centralwidget);
        pushButton_7->setObjectName("pushButton_7");
        pushButton_7->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_7, 0, 2, 1, 1);

        pushButton_11 = new QPushButton(centralwidget);
        pushButton_11->setObjectName("pushButton_11");
        pushButton_11->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_11, 0, 4, 1, 1);

        pushButton_4 = new QPushButton(centralwidget);
        pushButton_4->setObjectName("pushButton_4");
        pushButton_4->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_4, 1, 0, 1, 1);

        pushButton_6 = new QPushButton(centralwidget);
        pushButton_6->setObjectName("pushButton_6");
        pushButton_6->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_6, 1, 1, 1, 1);

        pushButton_8 = new QPushButton(centralwidget);
        pushButton_8->setObjectName("pushButton_8");
        pushButton_8->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_8, 1, 2, 1, 1);

        pushButton_10 = new QPushButton(centralwidget);
        pushButton_10->setObjectName("pushButton_10");
        pushButton_10->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_10, 1, 3, 1, 1);

        pushButton_9 = new QPushButton(centralwidget);
        pushButton_9->setObjectName("pushButton_9");
        pushButton_9->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_9, 0, 3, 1, 1);

        pushButton_12 = new QPushButton(centralwidget);
        pushButton_12->setObjectName("pushButton_12");
        pushButton_12->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_12, 1, 4, 1, 1);


        verticalLayout->addLayout(gridLayout);

        verticalLayout->setStretch(0, 9);
        verticalLayout->setStretch(1, 1);
        MainWindow->setCentralWidget(centralwidget);
        menubar = new QMenuBar(MainWindow);
        menubar->setObjectName("menubar");
        menubar->setGeometry(QRect(0, 0, 1168, 21));
        MainWindow->setMenuBar(menubar);
        statusbar = new QStatusBar(MainWindow);
        statusbar->setObjectName("statusbar");
        MainWindow->setStatusBar(statusbar);

        retranslateUi(MainWindow);

        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QCoreApplication::translate("MainWindow", "MainWindow", nullptr));
        pushButton->setText(QCoreApplication::translate("MainWindow", "\320\236\320\242\320\232\320\240\320\253\320\242\320\254", nullptr));
        pushButton_2->setText(QCoreApplication::translate("MainWindow", "\320\227\320\220\320\232\320\240\320\253\320\242\320\254", nullptr));
        pushButton_3->setText(QCoreApplication::translate("MainWindow", "\320\241\320\233\320\243\320\247\320\220\320\231\320\235\320\253\320\231 \320\232\320\222\320\220\320\224\320\240\320\220\320\242", nullptr));
        pushButton_5->setText(QCoreApplication::translate("MainWindow", "\320\222\320\253\320\221\320\240\320\220\320\242\320\254 \320\237\320\236\320\230\320\235\320\242\320\225\320\240", nullptr));
        pushButton_7->setText(QCoreApplication::translate("MainWindow", "\320\222\320\253\320\221\320\240\320\220\320\242\320\254 \320\232\320\222\320\220\320\224\320\240\320\220\320\242", nullptr));
        pushButton_11->setText(QCoreApplication::translate("MainWindow", "\320\222\320\253\320\221\320\240\320\220\320\242\320\254 \320\242\320\225\320\232\320\241\320\242", nullptr));
        pushButton_4->setText(QCoreApplication::translate("MainWindow", "\320\222\320\253\320\221\320\240\320\220\320\242\320\254 \320\232\320\240\320\243\320\223", nullptr));
        pushButton_6->setText(QCoreApplication::translate("MainWindow", "\320\222\320\253\320\221\320\240\320\220\320\242\320\254 \320\242\320\236\320\247\320\232\320\243", nullptr));
        pushButton_8->setText(QCoreApplication::translate("MainWindow", "\320\222\320\253\320\221\320\240\320\220\320\242\320\254 \320\220\320\240\320\232\320\243", nullptr));
        pushButton_10->setText(QCoreApplication::translate("MainWindow", "\320\222\320\253\320\221\320\240\320\220\320\242\320\254 \320\237\320\236\320\240\320\242", nullptr));
        pushButton_9->setText(QCoreApplication::translate("MainWindow", "\320\222\320\253\320\221\320\240\320\220\320\242\320\254 \320\233\320\230\320\235\320\230\320\256", nullptr));
        pushButton_12->setText(QCoreApplication::translate("MainWindow", "\320\236\320\247\320\230\320\241\320\242\320\230\320\242\320\254", nullptr));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
