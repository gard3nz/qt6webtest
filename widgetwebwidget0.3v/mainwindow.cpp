#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    webView = new QWebEngineView(this);
    ui->widget->layout()->addWidget(webView);

    connect(webView->page()->profile(), &QWebEngineProfile::downloadRequested,
            this, [](QWebEngineDownloadRequest *download) {
                QString savePath = QFileDialog::getSaveFileName(
                    nullptr,
                    "Сохранить как...",
                    download->downloadFileName(),
                    "SVG Картинка (*.svg);;Все файлы (*)"
                    );

                if (!savePath.isEmpty()) {
                    QFileInfo fileInfo(savePath);
                    download->setDownloadDirectory(fileInfo.absolutePath());
                    download->setDownloadFileName(fileInfo.fileName());
                    download->accept();
                } else {
                    download->cancel();
                }
            });

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
    webView->page()->runJavaScript("window.clearall();");
}


void MainWindow::on_pushButton_13_clicked()
{
    webView->page()->runJavaScript("window.undo();");
}


void MainWindow::on_pushButton_14_clicked()
{
    webView->page()->runJavaScript("window.redo();");
}


void MainWindow::on_pushButton_15_clicked()
{
    webView->page()->runJavaScript("deleteSelected();");
}


void MainWindow::on_pushButton_16_clicked()
{
    webView->page()->runJavaScript("exportToSVG();");
}


void MainWindow::on_pushButton_17_clicked()
{
    webView->page()->runJavaScript("window.selectTool('pointer');");

}


void MainWindow::on_comboBox_currentTextChanged(const QString &arg1)
{
    webView->page()->runJavaScript(QString("window.setFontFamily('%1');").arg(arg1));
}


void MainWindow::on_spinBox_valueChanged(int arg1)
{
    webView->page()->runJavaScript(QString("window.setFontSize(%1);").arg(arg1));
}


void MainWindow::on_spinBox_2_valueChanged(int arg1)
{
    webView->page()->runJavaScript(QString("window.setArcRadius(%1);").arg(arg1));
}


void MainWindow::on_spinBox_3_valueChanged(int arg1)
{
    webView->page()->runJavaScript(QString("window.setArcAngle(%1);").arg(arg1));
}




void MainWindow::on_pushButton_18_clicked()
{
    webView->page()->runJavaScript("updateGridSize(GRID_SIZE - 5);");
}


void MainWindow::on_pushButton_19_clicked()
{
    webView->page()->runJavaScript("updateGridSize(GRID_SIZE + 5);");
}

