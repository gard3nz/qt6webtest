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


void MainWindow::on_pushButton_3_clicked()
{
    webView->page()->runJavaScript("spawnRect();");
}


void MainWindow::on_pushButton_4_clicked()
{
    webView->page()->runJavaScript("window.selectTool('circle');");
}

void MainWindow::on_pushButton_5_clicked()
{
    webView->page()->runJavaScript("window.selectTool('pointer');");
}

void MainWindow::on_pushButton_6_clicked()
{
    webView->page()->runJavaScript("window.selectTool('rect');");
}

void MainWindow::on_pushButton_7_clicked()
{
    webView->page()->runJavaScript("window.selectTool('square');");
}

void MainWindow::on_pushButton_8_clicked()
{
    webView->page()->runJavaScript("window.selectTool('arc');");
}

void MainWindow::on_pushButton_9_clicked()
{
    webView->page()->runJavaScript("window.selectTool('line');");
}

void MainWindow::on_pushButton_10_clicked()
{
    webView->page()->runJavaScript("window.selectTool('port');");
}

void MainWindow::on_pushButton_11_clicked()
{
    webView->page()->runJavaScript("window.selectTool('text');");
}


void MainWindow::on_pushButton_12_clicked()
{
    webView->page()->runJavaScript("window.clearall()");
}

