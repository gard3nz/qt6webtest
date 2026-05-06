#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    webView = new QWebEngineView(this);
    ui->widget->layout()->addWidget(webView);
    webView->setUrl(QUrl("qrc:/index.html"));
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::on_pushButton_clicked()
{
    webView->show();
}


void MainWindow::on_pushButton_2_clicked()
{
    webView->hide();
}

