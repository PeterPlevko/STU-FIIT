from datetime import datetime
import pandas as pd
from sklearn.base import TransformerMixin
from sklearn.feature_selection import f_classif, SelectKBest, chi2
from sklearn.impute import KNNImputer
from sklearn.preprocessing import OrdinalEncoder, MinMaxScaler, PowerTransformer, QuantileTransformer


def load_dataset(filename1):
    df_profiles = pd.read_csv(filename1, sep=',')
    df_profiles.drop('No', axis=1, inplace=True)
    df_profiles.drop_duplicates()
    return df_profiles

class CustomEncoderTransformer(TransformerMixin):
    def __init__(self, column_names, categorical_cols):
        self.column_names = column_names
        self.categorical_cols = categorical_cols


    def fit(self, X, y=None):
        return self

    def transform(self, X):
        X = pd.DataFrame(X, columns=self.column_names)
        enc = OrdinalEncoder()
        X[self.categorical_cols] = enc.fit_transform(X[self.categorical_cols])
        return X


class CustomOutlierTransformer(TransformerMixin):
    def __init__(self, column_names, numerical_cols, strategy="drop"):
        self.column_names = column_names
        self.numerical_cols = numerical_cols
        self.strategy = strategy

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        X = pd.DataFrame(X, columns=self.column_names)
        for column in X.columns:
            if (column in self.numerical_cols):
                df_merged_out = self.identify_outliers(X[column])
                if (self.strategy == "drop"):
                    X = X.drop(df_merged_out.index)
                elif (self.strategy == "mean"):
                    X[column].fillna(X[column].mean(), inplace=True)
       
        return X

    def identify_outliers(self, x):
        iqr = x.quantile(0.75) - x.quantile(0.25)
        lower_ = x.quantile(0.25) - 1.5 * iqr
        upper_ = x.quantile(0.75) + 1.5 * iqr

        return x[(x > upper_) | (x < lower_)]


class CustomMinMaxTransformer(TransformerMixin):
    def __init__(self, column_names, numerical_cols, strategy="scaler"):
        self.column_names = column_names
        self.numerical_cols = numerical_cols
        self.strategy = strategy

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        X = pd.DataFrame(X, columns=self.column_names)
        if (self.strategy == "scaler"):
            scaler = MinMaxScaler()
            X[self.numerical_cols] = scaler.fit_transform(X[self.numerical_cols])
        elif (self.strategy == "transformer"):
            transformer =  PowerTransformer(method='yeo-johnson')
            X[self.numerical_cols] = transformer.fit_transform(X[self.numerical_cols])
        return X


class CustomNullValuesTransformer(TransformerMixin):
    def __init__(self, column_names, strategy="knn"):
        self.column_names = column_names
        self.strategy = strategy

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        X = pd.DataFrame(X, columns=self.column_names)
        if self.strategy == "knn":
            imputer = KNNImputer(n_neighbors=5)
            X = pd.DataFrame(imputer.fit_transform(X), columns=X.columns)
        elif self.strategy == "drop":
            X.dropna(inplace=True)

        return X


class CustomAtributeSelectionTransformer(TransformerMixin):
    def __init__(self, column_names, k=1):
        self.column_names = column_names
        self.k = k
        self.cols = []

    def fit(self, X, y=None):
        return self

    def transform(self, x, y):
        if (len(self.cols) == 0):
            fs = SelectKBest(score_func=f_classif, k=self.k)
            fs.fit(x, y)
            self.cols = fs.get_support(indices=True)

        x = x.iloc[:, self.cols]

        return x, y

class InputAndOutputTransformer(TransformerMixin):
    def __init__(self, column_names, feature_cols, output_cols):
        self.column_names = column_names
        self.feature_cols = feature_cols
        self.output_cols = output_cols
        
    def fit(self, X, y=None):
        return self

    def transform(self, X):
        X = pd.DataFrame(X, columns=self.column_names)
        X, y = self.split_dataset(X)
        return X, y

    def split_dataset(self, dataset):
        X = dataset[self.feature_cols]
        y = dataset[self.output_cols]
        return X, y
