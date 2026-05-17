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
#include <QtWidgets/QComboBox>
#include <QtWidgets/QFrame>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QLabel>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QMenuBar>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpinBox>
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
    QPushButton *pushButton_4;
    QPushButton *pushButton_15;
    QPushButton *pushButton_12;
    QPushButton *pushButton_13;
    QPushButton *pushButton_5;
    QPushButton *pushButton_16;
    QPushButton *pushButton_11;
    QPushButton *pushButton_9;
    QPushButton *pushButton_7;
    QPushButton *pushButton_10;
    QPushButton *pushButton_6;
    QPushButton *pushButton_8;
    QPushButton *pushButton_14;
    QPushButton *pushButton_3;
    QPushButton *pushButton_17;
    QHBoxLayout *horizontalLayout_3;
    QLabel *label;
    QComboBox *comboBox;
    QSpinBox *spinBox;
    QFrame *line;
    QLabel *label_2;
    QSpinBox *spinBox_2;
    QSpinBox *spinBox_3;
    QFrame *line_2;
    QLabel *label_3;
    QPushButton *pushButton_18;
    QPushButton *pushButton_19;
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
"\n"
"QFrame[frameShape=\"5\"] { \n"
"    background-color: #3d3d3d;\n"
"}\n"
"\n"
"QLabel {\n"
"    font-weight: 700;\n"
"	color: #ffffff; \n"
"}\n"
"\n"
"QSpinBox {\n"
"    border: 1px solid #3d3d3d;\n"
"    border-radius: 4px;\n"
"    background-color: #2d2d2d;\n"
"    color: #ffffff;\n"
"}\n"
"\n"
"QComboBox {\n"
"    border: 1px solid #3d3d3d;\n"
"    border-radius: 4px;\n"
"    background-color: #2d2d2d;\n"
"	color: #ffffff\n"
"}\n"
"\n"
"QComboBox QAbstractItemView {\n"
"    border: 1px solid #3d3d3d;\n"
"    border-radius: 4px;\n"
"    background-color: #2d2d2d;\n"
"	color: #ffffff\n"
"}"));
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
        pushButton_4 = new QPushButton(centralwidget);
        pushButton_4->setObjectName("pushButton_4");
        pushButton_4->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_4, 2, 0, 1, 1);

        pushButton_15 = new QPushButton(centralwidget);
        pushButton_15->setObjectName("pushButton_15");
        pushButton_15->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_15, 0, 6, 1, 1);

        pushButton_12 = new QPushButton(centralwidget);
        pushButton_12->setObjectName("pushButton_12");
        pushButton_12->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_12, 2, 4, 1, 1);

        pushButton_13 = new QPushButton(centralwidget);
        pushButton_13->setObjectName("pushButton_13");
        pushButton_13->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_13, 0, 5, 1, 1);

        pushButton_5 = new QPushButton(centralwidget);
        pushButton_5->setObjectName("pushButton_5");
        pushButton_5->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_5, 0, 1, 1, 1);

        pushButton_16 = new QPushButton(centralwidget);
        pushButton_16->setObjectName("pushButton_16");
        pushButton_16->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_16, 2, 6, 1, 1);

        pushButton_11 = new QPushButton(centralwidget);
        pushButton_11->setObjectName("pushButton_11");
        pushButton_11->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_11, 0, 4, 1, 1);

        pushButton_9 = new QPushButton(centralwidget);
        pushButton_9->setObjectName("pushButton_9");
        pushButton_9->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_9, 0, 3, 1, 1);

        pushButton_7 = new QPushButton(centralwidget);
        pushButton_7->setObjectName("pushButton_7");
        pushButton_7->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_7, 0, 2, 1, 1);

        pushButton_10 = new QPushButton(centralwidget);
        pushButton_10->setObjectName("pushButton_10");
        pushButton_10->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_10, 2, 3, 1, 1);

        pushButton_6 = new QPushButton(centralwidget);
        pushButton_6->setObjectName("pushButton_6");
        pushButton_6->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_6, 2, 1, 1, 1);

        pushButton_8 = new QPushButton(centralwidget);
        pushButton_8->setObjectName("pushButton_8");
        pushButton_8->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_8, 2, 2, 1, 1);

        pushButton_14 = new QPushButton(centralwidget);
        pushButton_14->setObjectName("pushButton_14");
        pushButton_14->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_14, 2, 5, 1, 1);

        pushButton_3 = new QPushButton(centralwidget);
        pushButton_3->setObjectName("pushButton_3");
        pushButton_3->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_3, 0, 0, 1, 1);

        pushButton_17 = new QPushButton(centralwidget);
        pushButton_17->setObjectName("pushButton_17");
        pushButton_17->setMinimumSize(QSize(0, 35));

        gridLayout->addWidget(pushButton_17, 0, 7, 1, 1);


        verticalLayout->addLayout(gridLayout);

        horizontalLayout_3 = new QHBoxLayout();
        horizontalLayout_3->setObjectName("horizontalLayout_3");
        label = new QLabel(centralwidget);
        label->setObjectName("label");
        label->setMaximumSize(QSize(60, 16777215));
        QFont font;
        font.setPointSize(14);
        font.setBold(true);
        label->setFont(font);

        horizontalLayout_3->addWidget(label);

        comboBox = new QComboBox(centralwidget);
        comboBox->addItem(QString());
        comboBox->addItem(QString());
        comboBox->addItem(QString());
        comboBox->setObjectName("comboBox");
        comboBox->setMinimumSize(QSize(0, 30));

        horizontalLayout_3->addWidget(comboBox);

        spinBox = new QSpinBox(centralwidget);
        spinBox->setObjectName("spinBox");
        spinBox->setMinimumSize(QSize(0, 30));
        spinBox->setMinimum(8);
        spinBox->setMaximum(72);
        spinBox->setValue(16);

        horizontalLayout_3->addWidget(spinBox);

        line = new QFrame(centralwidget);
        line->setObjectName("line");
        line->setStyleSheet(QString::fromUtf8(""));
        line->setFrameShape(QFrame::Shape::VLine);
        line->setFrameShadow(QFrame::Shadow::Sunken);

        horizontalLayout_3->addWidget(line);

        label_2 = new QLabel(centralwidget);
        label_2->setObjectName("label_2");
        label_2->setMinimumSize(QSize(0, 0));
        label_2->setFont(font);

        horizontalLayout_3->addWidget(label_2);

        spinBox_2 = new QSpinBox(centralwidget);
        spinBox_2->setObjectName("spinBox_2");
        spinBox_2->setMinimumSize(QSize(0, 30));
        spinBox_2->setMinimum(5);
        spinBox_2->setMaximum(300);
        spinBox_2->setValue(40);

        horizontalLayout_3->addWidget(spinBox_2);

        spinBox_3 = new QSpinBox(centralwidget);
        spinBox_3->setObjectName("spinBox_3");
        spinBox_3->setMinimumSize(QSize(0, 30));
        spinBox_3->setMinimum(1);
        spinBox_3->setMaximum(360);
        spinBox_3->setValue(90);

        horizontalLayout_3->addWidget(spinBox_3);

        line_2 = new QFrame(centralwidget);
        line_2->setObjectName("line_2");
        line_2->setFrameShape(QFrame::Shape::VLine);
        line_2->setFrameShadow(QFrame::Shadow::Sunken);

        horizontalLayout_3->addWidget(line_2);

        label_3 = new QLabel(centralwidget);
        label_3->setObjectName("label_3");
        label_3->setMaximumSize(QSize(130, 16777215));
        label_3->setFont(font);

        horizontalLayout_3->addWidget(label_3);

        pushButton_18 = new QPushButton(centralwidget);
        pushButton_18->setObjectName("pushButton_18");
        pushButton_18->setMinimumSize(QSize(0, 30));
        pushButton_18->setMaximumSize(QSize(30, 16777215));
        QFont font1;
        font1.setPointSize(15);
        font1.setBold(true);
        pushButton_18->setFont(font1);

        horizontalLayout_3->addWidget(pushButton_18);

        pushButton_19 = new QPushButton(centralwidget);
        pushButton_19->setObjectName("pushButton_19");
        pushButton_19->setMinimumSize(QSize(0, 30));
        pushButton_19->setMaximumSize(QSize(30, 16777215));
        pushButton_19->setFont(font1);

        horizontalLayout_3->addWidget(pushButton_19);


        verticalLayout->addLayout(horizontalLayout_3);

        verticalLayout->setStretch(0, 20);
        verticalLayout->setStretch(1, 1);
        verticalLayout->setStretch(2, 2);
        verticalLayout->setStretch(3, 2);
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
        pushButton_4->setText(QCoreApplication::translate("MainWindow", "\320\222\320\253\320\221\320\240\320\220\320\242\320\254 \320\232\320\240\320\243\320\223", nullptr));
        pushButton_15->setText(QCoreApplication::translate("MainWindow", "\320\243\320\224\320\220\320\233\320\230\320\242\320\254", nullptr));
        pushButton_12->setText(QCoreApplication::translate("MainWindow", "\320\236\320\247\320\230\320\241\320\242\320\230\320\242\320\254", nullptr));
        pushButton_13->setText(QCoreApplication::translate("MainWindow", "\320\235\320\220\320\227\320\220\320\224", nullptr));
        pushButton_5->setText(QCoreApplication::translate("MainWindow", "\320\222\320\253\320\221\320\240\320\220\320\242\320\254 \320\237\320\236\320\230\320\235\320\242\320\225\320\240", nullptr));
        pushButton_16->setText(QCoreApplication::translate("MainWindow", "\320\241\320\236\320\245\320\240\320\220\320\235\320\230\320\242\320\254", nullptr));
        pushButton_11->setText(QCoreApplication::translate("MainWindow", "\320\222\320\253\320\221\320\240\320\220\320\242\320\254 \320\242\320\225\320\232\320\241\320\242", nullptr));
        pushButton_9->setText(QCoreApplication::translate("MainWindow", "\320\222\320\253\320\221\320\240\320\220\320\242\320\254 \320\233\320\230\320\235\320\230\320\256", nullptr));
        pushButton_7->setText(QCoreApplication::translate("MainWindow", "\320\222\320\253\320\221\320\240\320\220\320\242\320\254 \320\232\320\222\320\220\320\224\320\240\320\220\320\242", nullptr));
        pushButton_10->setText(QCoreApplication::translate("MainWindow", "\320\222\320\253\320\221\320\240\320\220\320\242\320\254 \320\237\320\236\320\240\320\242", nullptr));
        pushButton_6->setText(QCoreApplication::translate("MainWindow", "\320\222\320\253\320\221\320\240\320\220\320\242\320\254 \320\242\320\236\320\247\320\232\320\243", nullptr));
        pushButton_8->setText(QCoreApplication::translate("MainWindow", "\320\222\320\253\320\221\320\240\320\220\320\242\320\254 \320\220\320\240\320\232\320\243", nullptr));
        pushButton_14->setText(QCoreApplication::translate("MainWindow", "\320\222\320\237\320\225\320\240\320\225\320\224", nullptr));
        pushButton_3->setText(QCoreApplication::translate("MainWindow", "\320\241\320\233\320\243\320\247\320\220\320\231\320\235\320\253\320\231 \320\232\320\222\320\220\320\224\320\240\320\220\320\242", nullptr));
        pushButton_17->setText(QCoreApplication::translate("MainWindow", "\320\243\320\232\320\220\320\227\320\220\320\242\320\225\320\233\320\254", nullptr));
        label->setText(QCoreApplication::translate("MainWindow", "\320\242\320\265\320\272\321\201\321\202:", nullptr));
        comboBox->setItemText(0, QCoreApplication::translate("MainWindow", "Arial", nullptr));
        comboBox->setItemText(1, QCoreApplication::translate("MainWindow", "Times New Roman", nullptr));
        comboBox->setItemText(2, QCoreApplication::translate("MainWindow", "Courier New", nullptr));

        label_2->setText(QCoreApplication::translate("MainWindow", "\320\240\320\260\320\264\320\270\321\203\321\201/\321\203\320\263\320\276\320\273 \320\264\321\203\320\263\320\270:", nullptr));
        label_3->setText(QCoreApplication::translate("MainWindow", "\320\240\320\260\320\267\320\274\320\265\321\200 \321\201\320\265\321\202\320\272\320\270:", nullptr));
        pushButton_18->setText(QCoreApplication::translate("MainWindow", "-5", nullptr));
        pushButton_19->setText(QCoreApplication::translate("MainWindow", "+5", nullptr));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
